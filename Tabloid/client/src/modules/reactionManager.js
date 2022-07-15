const apiUrl = "/api/Reaction";

export const getAllReactions = () => {
  return fetch(apiUrl).then((res) => res.json());
};

export const addReaction = (reaction) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reaction),
  });
};
