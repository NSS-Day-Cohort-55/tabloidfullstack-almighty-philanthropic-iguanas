import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getAllPosts } from "../../modules/postManager";
import {useNavigate} from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  let navigate = useNavigate();

  const getPosts = () => {
    getAllPosts().then((posts) => setPosts(posts));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Button
          onClick={() =>
            navigate("./CreatePost")
          }
        > Create Post </Button>
        

      <div className="postListContainer">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    
    </>
  );
}
