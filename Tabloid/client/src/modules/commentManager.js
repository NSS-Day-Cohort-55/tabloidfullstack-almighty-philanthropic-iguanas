const baseUrl = "/api/comment";

export const getAllCategories = () => {
  return fetch(baseUrl).then((res) => res.json());
};

export const addComment = (comment) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};

export const getComment = (id) => {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};

export const deleteComment = (id) => {
  return fetch(baseUrl + `/${id}`, {
    method: "DELETE",
  });
};

export const editComment = (comment) => {
  return fetch(baseUrl + `/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};
