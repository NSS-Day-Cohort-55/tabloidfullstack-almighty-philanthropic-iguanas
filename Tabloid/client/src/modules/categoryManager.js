import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = "/api/category";

export const getAllCategories = () => {
  return fetch(baseUrl).then((res) => res.json());
};

export const addCategory = (category) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
};

export const getCategory = (id) => {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};

export const deleteCategory = (id) => {
  return fetch(baseUrl + `/${id}`, {
    method: "DELETE",
  });
};

export const editCategory = (category) => {
  return fetch(baseUrl + `/${category.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
};
