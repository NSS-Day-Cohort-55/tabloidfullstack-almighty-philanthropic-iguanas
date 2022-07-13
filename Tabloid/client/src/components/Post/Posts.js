import React, { useEffect, useState } from "react";
import Post from "./Post";
<<<<<<< HEAD
import { getAllPosts } from "../../modules/postManager";
import {useNavigate} from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
=======
import { getAllPosts, getPostsByCategory } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";
>>>>>>> main

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();

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
<<<<<<< HEAD
      <Button
          onClick={() =>
            navigate("./CreatePost")
          }
        > Create Post </Button>
        

=======
      <select id="categoryId" onChange={handleFieldChange} defaultValue="0">
        <option value={"0"}>All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
>>>>>>> main
      <div className="postListContainer">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
<<<<<<< HEAD
    
=======
>>>>>>> main
    </>
  );
}
