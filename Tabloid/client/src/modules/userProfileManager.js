const baseUrl = "/api/UserProfile";

export const getAllActiveUsers= () => {
    return fetch(baseUrl).then((response) =>response.json())
};

export const getAllDeactivatedUsers= () => {
    return fetch(`${baseUrl}/GetDeactivated`).then((response) =>response.json())
};