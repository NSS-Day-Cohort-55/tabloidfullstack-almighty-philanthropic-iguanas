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

export const deletePost = (id) => {
  return fetch(apiUrl + `/${id}`, {
    method: "DELETE",
  });
};

export const getPostsByCategory = (categoryId) => {
  return fetch(`${apiUrl}/GetCategoryPosts/${categoryId}`).then((res) =>
    res.json()
  );
};

export const getPostReactions = (postId) => {
  return fetch(`${apiUrl}/GetPostReactions/${postId}`).then((res) =>
    res.json()
  );
};

export const handlePostReaction = (postId, reactionId, userId) => {
  return fetch(
    `${apiUrl}/api/Post/HandlePostReaction/${postId}/${reactionId}/${userId}`
  );
};
