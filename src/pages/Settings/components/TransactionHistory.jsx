import { useEffect, useState } from "react";
import {
	Box,
	Card,
	Chip,
	CircularProgress,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { getMyTransactions } from "../../../api/payment.api";
import AppAlert from "../../../components/ui/AppAlert";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import { PAYMENT_ERRORS } from "../../../constants/apiErrors";
import { useAuth } from "../../../hooks/useAuth";
import { surfaceSectionSx } from "../../../theme/layout";
import { parseApiError } from "../../../utils/parseApiError";

const PAGE_SIZE = 10;

const STATUS_COLORS = {
	paid: "success",
	pending: "warning",
	cancelled: "default",
	overdue: "error",
};

function formatAmount(amountMinor, currency) {
	return new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: String(currency || "EUR").toUpperCase(),
	}).format((amountMinor ?? 0) / 100);
}

function formatDate(value) {
	if (!value) return "—";

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "—";

	return new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
}

export default function TransactionHistory() {
	const { role } = useAuth();
	const [transactions, setTransactions] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [hasMore, setHasMore] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		getMyTransactions({ page: 1, pageSize: PAGE_SIZE })
			.then((result) => {
				if (!active) return;

				setTransactions(result.items);
				setPage(result.page);
				setTotal(result.total);
				setHasMore(result.hasMore);
			})
			.catch((err) => {
				if (!active) return;

				const apiError = parseApiError(
					err,
					PAYMENT_ERRORS,
					"We couldn't load your transaction history.",
				);
				setError(apiError.message);
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, []);

	const loadMore = async () => {
		setLoadingMore(true);
		setError("");

		try {
			const result = await getMyTransactions({
				page: page + 1,
				pageSize: PAGE_SIZE,
			});

			setTransactions((current) => [...current, ...result.items]);
			setPage(result.page);
			setTotal(result.total);
			setHasMore(result.hasMore);
		} catch (err) {
			const apiError = parseApiError(
				err,
				PAYMENT_ERRORS,
				"We couldn't load your transaction history.",
			);
			setError(apiError.message);
		} finally {
			setLoadingMore(false);
		}
	};

	const isContractor = role === "contractor";

	return (
		<Card elevation={0} sx={{ ...surfaceSectionSx, mt: 3 }}>
			<Stack spacing={2.5}>
				<Box>
					<Typography variant="h6" fontWeight={800}>
						Transaction history
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
						{isContractor ? "Earnings received for completed jobs." : "Payments made for completed jobs."}
					</Typography>
				</Box>

				{error && (
					<AppAlert severity="error" title="Transactions could not be loaded">
						{error}
					</AppAlert>
				)}

				{loading ? (
					<Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
						<CircularProgress size={28} />
					</Box>
				) : transactions.length === 0 ? (
					<AppAlert title="No transactions yet">Completed job payments will appear here.</AppAlert>
				) : (
					<>
						<TableContainer sx={{ overflowX: "auto" }}>
							<Table aria-label="Transaction history">
								<TableHead
									sx={{
										"& .MuiTableCell-root": {
											bgcolor: "rgba(91, 63, 214, 0.055)",
											color: "text.primary",
											fontSize: "0.75rem",
											fontWeight: 900,
											letterSpacing: "0.045em",
											textTransform: "uppercase",
											borderBottomColor: "rgba(91, 63, 214, 0.12)",
											py: 1.75,
										},
										"& .MuiTableCell-root:first-of-type": {
											borderTopLeftRadius: 10,
										},
										"& .MuiTableCell-root:last-of-type": {
											borderTopRightRadius: 10,
										},
									}}
								>
									<TableRow>
										<TableCell>Job</TableCell>
										<TableCell>Type</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Date</TableCell>
										<TableCell align="right">Amount</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{transactions.map((transaction) => {
										const detailsPath = isContractor
											? `/contractor/applications/${transaction.applicationId}`
											: `/client/jobs/${transaction.jobId}/applications/${transaction.applicationId}`;

										return (
											<TableRow key={transaction.id} hover>
												<TableCell>
													<Typography
														component={RouterLink}
														to={detailsPath}
														variant="body2"
														sx={{
															color: "primary.main",
															fontWeight: 700,
															textDecoration: "none",
															"&:hover": { textDecoration: "underline" },
														}}
													>
														{transaction.jobTitle || "Untitled job"}
													</Typography>
												</TableCell>
												<TableCell>{transaction.type === "earning" ? "Earning" : "Payment"}</TableCell>
												<TableCell>
													<Chip
														size="small"
														label={transaction.status}
														color={STATUS_COLORS[transaction.status] ?? "default"}
														sx={{ textTransform: "capitalize", fontWeight: 700 }}
													/>
												</TableCell>
												<TableCell>{formatDate(transaction.updatedAt ?? transaction.createdAt)}</TableCell>
												<TableCell align="right" sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>
													{formatAmount(transaction.amountMinor, transaction.currency)}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>

						<Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
							<Typography variant="caption" color="text.secondary">
								Showing {transactions.length} of {total}
							</Typography>
							{hasMore && (
								<SecondaryButton disabled={loadingMore} onClick={loadMore}>
									{loadingMore ? "Loading..." : "Load more"}
								</SecondaryButton>
							)}
						</Stack>
					</>
				)}
			</Stack>
		</Card>
	);
}
