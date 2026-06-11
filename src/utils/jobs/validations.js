export const getMissingFields = (jobData) => {
    const missingFields = [];

    if (!jobData.title.trim()) missingFields.push("job title");
    if (!jobData.category.trim()) missingFields.push("category");
    if (!jobData.description.trim()) missingFields.push("description");
    if (!jobData.locationType) missingFields.push("location type");

    if ((jobData.locationType === "onsite" || jobData.locationType === "hybrid") && !jobData.location.trim()) {
        missingFields.push("location");
    }

    if (!jobData.deadline) missingFields.push("application deadline");
    if (!jobData.budgetType) missingFields.push("budget type");
    if (!jobData.rate) missingFields.push("budget/rate");
    if (!jobData.durationDays) missingFields.push("duration");
    if (!jobData.deliverables.trim()) missingFields.push("deliverables");

    return missingFields;
};
