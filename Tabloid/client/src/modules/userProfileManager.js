const baseUrl = "/api/UserProfile";

export const getAllActiveUsers= () => {
    return fetch(baseUrl).then((response) =>response.json())
};

export const getAllDeactivatedUsers= () => {
    return fetch(`${baseUrl}/GetDeactivated`).then((response) =>response.json())
};

export const getAllPendingDemotionUsers= () => {
    return fetch(`${baseUrl}/GetPendingDemotions`).then((response) =>response.json())
};

export const getUserProfileById= (num) =>{
    return fetch(`${baseUrl}/Details/${num}`).then((response) =>response.json())
}