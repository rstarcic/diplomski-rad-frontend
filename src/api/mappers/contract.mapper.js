import { mapStatusFromAPI } from "./status.mapper";

export function mapContractFromAPI(contract = null, fallbackJob = null) {
    if (!contract) return null;
    const contractData = contract?.contract ?? contract;
    if (!contractData) return null;

    const fallback = fallbackJob ?? {};
    const client = contractData.client ?? contractData.client_details ?? contractData.clientInfo ?? {};
    const contractor = contractData.contractor ?? contractData.contractor_details ?? contractData.contractorInfo ?? {};
    const platform = contractData.platform ?? {};
    const job = contractData.job ?? fallback;

    const buildPersonName = (person = {}) => {
        if (!person || typeof person !== "object") return "";
        return (
            person.full_name ??
            person.fullName ??
            person.name ??
            person.username ??
            [person.first_name, person.last_name].filter(Boolean).join(" ") ??
            ""
        );
    };

    return {
        id: contractData.id ?? contractData.contractId ?? contractData.contract_id,
        contractNumber: contractData.contract_number ?? contractData.contractNumber ?? "",
        platformName:
            contractData.platform_name ??
            contractData.platformName ??
            platform.name ??
            platform.title ??
            fallback.platform_name ??
            fallback.platformName ??
            fallback.platform ??
            "",
        applicationId: contractData.application_id ?? contractData.applicationId ?? "",
        negotiationId: contractData.negotiation_id ?? contractData.negotiationId ?? null,

        clientId: contractData.client_id ?? contractData.clientId ?? client.id ?? client.user_id ?? null,
        clientName:
            contractData.client_name ??
            contractData.clientName ??
            buildPersonName(client) ??
            fallback.client_name ??
            fallback.clientName ??
            "",
        clientEmail:
            contractData.client_email ??
            contractData.clientEmail ??
            client.email ??
            fallback.client_email ??
            fallback.clientEmail ??
            "",
        clientSignedAt: contractData.client_signed_at ?? contractData.clientSignedAt ?? null,
        clientSignatureUrl: contractData.client_signature_url ?? contractData.clientSignatureUrl ?? null,

        contractorId:
            contractData.contractor_id ?? contractData.contractorId ?? contractor.id ?? contractor.user_id ?? null,
        contractorName:
            contractData.contractor_name ??
            contractData.contractorName ??
            buildPersonName(contractor) ??
            fallback.contractor_name ??
            fallback.contractorName ??
            "",
        contractorEmail:
            contractData.contractor_email ??
            contractData.contractorEmail ??
            contractor.email ??
            fallback.contractor_email ??
            fallback.contractorEmail ??
            "",
        contractorSignedAt: contractData.contractor_signed_at ?? contractData.contractorSignedAt ?? null,
        contractorSignatureUrl: contractData.contractor_signature_url ?? contractData.contractorSignatureUrl ?? null,

        jobId: contractData.job_id ?? contractData.jobId ?? job.id ?? fallback.id ?? null,
        jobTitle: contractData.job_title ?? contractData.jobTitle ?? job.title ?? fallback.title ?? "",
        jobDescription:
            contractData.job_description ?? contractData.jobDescription ?? job.description ?? fallback.description ?? "",

        budgetAmount:
            contractData.budget_amount ??
            contractData.budgetAmount ??
            job.budget_amount ??
            job.budgetAmount ??
            fallback.budget_amount ??
            fallback.budgetAmount ??
            "",
        budgetType:
            contractData.budget_type ??
            contractData.budgetType ??
            job.budget_type ??
            job.budgetType ??
            fallback.budget_type ??
            fallback.budgetType ??
            "",
        currency: contractData.currency ?? job.currency ?? fallback.currency ?? "EUR",
        duration:
            contractData.duration ??
            contractData.duration_days ??
            contractData.durationDays ??
            job.duration ??
            job.duration_days ??
            job.durationDays ??
            fallback.duration ??
            fallback.duration_days ??
            fallback.durationDays ??
            "",
        hoursPerWeek:
            contractData.hours_per_week ??
            contractData.hoursPerWeek ??
            job.hours_per_week ??
            job.hoursPerWeek ??
            fallback.hours_per_week ??
            fallback.hoursPerWeek ??
            "",
        deliverables: contractData.deliverables ?? job.deliverables ?? fallback.deliverables ?? "",

        status: mapStatusFromAPI(contractData.status),
        startsAt: contractData.starts_at ?? contractData.startsAt ?? null,
        endsAt: contractData.ends_at ?? contractData.endsAt ?? null,
        createdAt: contractData.created_at ?? contractData.createdAt ?? null,
        updatedAt: contractData.updated_at ?? contractData.updatedAt ?? null,
    };
}

export function mapContractFromDetails(data = {}) {
    const contract = data.contract ?? data.contracts;
    const fallbackJob = data.job ?? null;
    if (contract) return mapContractFromAPI(contract, fallbackJob);

    const id = data.contractId ?? data.contract_id;
    const status = data.contractStatus ?? data.contract_status;
    return id || status ? mapContractFromAPI({ id, status }, fallbackJob) : null;
}
