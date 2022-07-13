import "firebase/auth";
const apiUrl = "/api/Post";

export const getAllPosts = () => {
  return fetch(apiUrl).then((res) => res.json());
};

export const getPost = (id) => {
  return fetch(`${apiUrl}/${id}`).then((res) => res.json());
};

export const getUsersPosts = (userId) => {
  return fetch(`${apiUrl}/GetUsersPosts/${userId}`).then((res) => res.json());
};

export const addPost = (post) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const getPostsByCategory = (categoryId) => {
  return fetch(`${apiUrl}/GetCategoryPosts/${categoryId}`).then((res) =>
    res.json()
  );
};
