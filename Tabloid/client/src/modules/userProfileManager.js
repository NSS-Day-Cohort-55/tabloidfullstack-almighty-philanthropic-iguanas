const baseUrl = "/api/UserProfile";

export const getAllActiveUsers = () => {
  return fetch(baseUrl).then((response) => response.json());
};

export const getUserByFireBaseId = (firebaseUid) => {
  return fetch(`${baseUrl}/UserProfile/${firebaseUid}`).then((response) =>
    response.json()
  );
};
