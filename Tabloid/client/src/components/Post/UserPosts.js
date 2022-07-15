import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getUsersPosts, getPostsByCategory } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

export default function UserPosts({ user }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();
  console.log(user);

  const getPosts = () => {
    getUsersPosts(user.id).then((posts) => setPosts(posts));
  };

  useEffect(() => {
    getAllCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    getPosts();
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
      <Button onClick={() => navigate("./CreatePost")}> Create Post </Button>

      <select id="categoryId" onChange={handleFieldChange} defaultValue="0">
        <option value={"0"}>All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="postListContainer">
        {posts?.map((post) => (
          <Post post={post} key={post.id} user={user} getPosts={getPosts} />
        ))}
      </div>
    </>
  );
}
