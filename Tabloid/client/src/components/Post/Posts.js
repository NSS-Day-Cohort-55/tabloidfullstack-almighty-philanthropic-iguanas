import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getAllPosts, getPostsByCategory } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getPosts = () => {
    getAllPosts().then((posts) => setPosts(posts));
  };

  useEffect(() => {
    getPosts();
    getAllCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const handleFieldChange = (evt) => {
    let categoryId = evt.target.value;
    if (categoryId != 0) {
      getPostsByCategory(categoryId).then((posts) => setPosts(posts));
    } else {
      getPosts();
    }
  };

  return (
    <>
      <select id="categoryId" onChange={handleFieldChange} defaultValue="0">
        <option value={"0"}>All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="postListContainer">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </>
  );
}
