const baseUrl = "/api/UserProfile";

export const getAllActiveUsers= () => {
    return fetch(baseUrl).then((response) =>response.json())
};