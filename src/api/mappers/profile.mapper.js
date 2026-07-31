export function splitFullName(fullName = "") {
    const parts = fullName.trim().split(" ");
    return {
        firstName: parts[0] ?? "",
        lastName: parts.slice(1).join(" "),
    };
}

export function mapContractorFromAPI(contractor = {}) {
    return {
        userId: contractor.userId ?? contractor.user_id,
        fullName: contractor.fullName ?? contractor.full_name ?? "",
        profileImageUrl: contractor.profile_picture ?? null,
        email: contractor.email ?? "",
        phone: contractor.phone ?? "",
        city: contractor.city ?? "",
        country: contractor.country ?? "",
        createdAt: contractor.createdAt ?? contractor.created_at ?? "",
        about: contractor.about ?? "",
    };
}
export function mapProfileFromAPI(profile = {}, { includePrivate = false } = {}) {
    const { firstName, lastName } = splitFullName(profile.full_name);

    const mappedProfile = {
        firstName,
        lastName,
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        country: profile.country ?? "",
        city: profile.city ?? "",
        about: profile.about ?? "",
        image: profile.profile_picture ?? null,
        createdAt: profile.created_at ?? null,
        role: profile.role ?? "",
        profileCompleted: profile.profile_completed ?? false,
    };

    if (includePrivate) {
        mappedProfile.address = profile.address ?? "";
        mappedProfile.postalCode = profile.postal_code ?? "";
        mappedProfile.countryCode = profile.country_code ?? "";
    }

    return mappedProfile;
}

export function mapProfileToAPI(formData = {}) {
    const payload = {
        profile: {
            full_name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            city: formData.city,
            about: formData.about,
        },
    };

    if (formData.address !== undefined) {
        payload.profile.address = formData.address.trim();
    }

    if (formData.postalCode !== undefined) {
        payload.profile.postal_code = formData.postalCode.trim();
    }

    if (formData.countryCode !== undefined) {
        payload.profile.country_code = formData.countryCode.trim().toUpperCase();
    }

    if (formData.skills) {
        payload.skills = mapSkillsToAPI(formData.skills);
    }

    if (formData.portfolio) {
        payload.portfolio = formData.portfolio.map(mapPortfolioItemToAPI);
    }

    return payload;
}

export function mapProfileToFormData(formData = {}) {
    const multipartPayload = new FormData();
    const payload = mapProfileToAPI(formData);

    Object.entries(payload.profile).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            multipartPayload.append(key, value);
        }
    });

    if (payload.skills) {
        multipartPayload.append("skills", JSON.stringify(payload.skills));
    }

    if (payload.portfolio) {
        multipartPayload.append("portfolio", JSON.stringify(payload.portfolio));
    }

    multipartPayload.append("profile_picture", formData.image);

    return multipartPayload;
}

export function mapPortfolioItemFromAPI(item = {}) {
    return {
        id: item.id,
        title: item.title ?? "",
        description: item.description ?? "",
        image: item.image_url ?? item.image ?? null,
        url: item.project_url ?? item.url ?? "",
    };
}

export function mapSkillsFromAPI(skills = []) {
    return skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
    }));
}

export function mapProfileStatsFromAPI(stats = []) {
    return stats.map((stat) => ({
        id: stat.id,
        value: stat.value,
        subtitle: stat.subtitle ?? "",
    }));
}

export function mapPortfolioItemToAPI(item = {}) {
    const payload = {
        title: item.title,
        description: item.description,
        image_url: item.image,
        project_url: item.url,
    };

    if (item.id) {
        payload.id = item.id;
    }

    return payload;
}

export function mapSkillsToAPI(skills = []) {
    return skills.map((skill) => {
        if (typeof skill === "string") {
            return { name: skill };
        }

        const payload = {
            name: skill.name,
        };

        if (skill.id) {
            payload.id = skill.id;
        }

        return payload;
    });
}
