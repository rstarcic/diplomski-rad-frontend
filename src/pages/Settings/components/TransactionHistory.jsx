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
import { ROLES } from "../../../constants/roles";
import { useAuth } from "../../../hooks/useAuth";
import { formatCurrency } from "../../../utils/formatters";
import { parseApiError } from "../../../utils/parseApiError";

import {
	amountCellSx,
	cardSx,
	footerSx,
	jobLinkSx,
	loadingSx,
	statusChipSx,
	tableContainerSx,
	tableHeadSx,
} from "./TransactionHistory.styles";

const PAGE_SIZE = 10;
const LOAD_ERROR_MESSAGE = "We couldn't load your transaction history.";

const STATUS_COLORS = {
	paid: "success",
	pending: "warning",
	cancelled: "default",
	overdue: "error",
};

function isCanceledRequest(error) {
	return error.name === "CanceledError" || error.name === "AbortError";
}

function formatTransactionAmount(amountMinor, currency) {
	return formatCurrency((amountMinor ?? 0) / 100, currency, "—");
}

function formatTransactionDate(value) {
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
		const controller = new AbortController();

		async function loadTransactions() {
			setLoading(true);
			setError("");

			try {
				const result = await getMyTransactions(
					{ page: 1, pageSize: PAGE_SIZE },
					controller.signal,
				);

				setTransactions(result.items);
				setPage(result.page);
				setTotal(result.total);
				setHasMore(result.hasMore);
			} catch (requestError) {
				if (isCanceledRequest(requestError)) return;

				const apiError = parseApiError(requestError, PAYMENT_ERRORS, LOAD_ERROR_MESSAGE);
				setError(apiError.message);
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		}

		loadTransactions();

		return () => controller.abort();
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
		} catch (requestError) {
			const apiError = parseApiError(requestError, PAYMENT_ERRORS, LOAD_ERROR_MESSAGE);
			setError(apiError.message);
		} finally {
			setLoadingMore(false);
		}
	};

	const isContractor = role === ROLES.CONTRACTOR;

	return (
		<Card elevation={0} sx={cardSx}>
			<Stack spacing={2.5}>
				<Box>
					<Typography variant="h6" fontWeight={800}>
						Transaction history
					</Typography>

					<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
						{isContractor
							? "Earnings received for completed jobs."
							: "Payments made for completed jobs."}
					</Typography>
				</Box>

				{error && (
					<AppAlert severity="error" title="Transactions could not be loaded">
						{error}
					</AppAlert>
				)}

				{loading ? (
					<Box sx={loadingSx}>
						<CircularProgress size={28} />
					</Box>
				) : transactions.length === 0 ? (
					!error && (
						<AppAlert title="No transactions yet">
							Completed job payments will appear here.
						</AppAlert>
					)
				) : (
					<>
						<TableContainer sx={tableContainerSx}>
							<Table aria-label="Transaction history">
								<TableHead sx={tableHeadSx}>
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
														sx={jobLinkSx}
													>
														{transaction.jobTitle || "Untitled job"}
													</Typography>
												</TableCell>

												<TableCell>
													{transaction.type === "earning" ? "Earning" : "Payment"}
												</TableCell>

												<TableCell>
													<Chip
														size="small"
														label={transaction.status}
														color={STATUS_COLORS[transaction.status] ?? "default"}
														sx={statusChipSx}
													/>
												</TableCell>

												<TableCell>
													{formatTransactionDate(transaction.updatedAt ?? transaction.createdAt)}
												</TableCell>

												<TableCell align="right" sx={amountCellSx}>
													{formatTransactionAmount(transaction.amountMinor, transaction.currency)}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>

						<Stack direction="row" sx={footerSx}>
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
