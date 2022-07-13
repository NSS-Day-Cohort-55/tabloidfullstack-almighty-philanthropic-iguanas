import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { addPost } from "../../modules/postManager";
import firebase from "firebase/app";
import "firebase/auth";
import { getAllCategories } from "../../modules/categoryManager";
import { PostPublishDateTime } from "../../helpers/formatDate";

export default function CreatePost({ user }) {
  const emptyPost = {
    title: "",
    content: "",
    imageLocation: "",
    publishDateTime: "",
    isApproved: false,
    categoryId: 0,
    userProfileId: user?.id,
  };

  console.log(user);

  const [post, setPost] = useState(emptyPost);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const stateToChange = { ...post };
    stateToChange[evt.target.id] = evt.target.value;
    setPost(stateToChange);
  };

  const integerCheck = (evt) => {
    const newPost = { ...post };

    if (evt.target.id === "categoryId") {
      newPost.categoryId = parseInt(evt.target.value);
    }
    setPost(newPost);
  };

  const handleSubmitPost = (evt) => {
    post.publishDateTime = PostPublishDateTime(post.publishDateTime);

    addPost(post)
      .then(() => navigate("/posts"))
      .catch((err) => alert(`An error occured: ${err.message}`));
  };

  useEffect(() => {
    getAllCategories().then((allCategories) => {
      setCategories(allCategories);
    });
  }, []);

  return (
    <Form>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          value={post.title}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input
          type="text"
          name="content"
          id="content"
          placeholder="content"
          value={post.content}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="categoryId">Category</Label> <br></br>
        <select
          value={post.categoryId}
          name="categoryId"
          id="categoryId"
          onChange={integerCheck}
        >
          <option value="0">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup>
        <Label for="imageLocation">Image Location</Label>
        <Input
          type="text"
          name="imageLocation"
          id="imageLocation"
          value={post.imageLocation}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="publishDateTime">Publish Date</Label>
        <Input
          type="date"
          name="publishDateTime"
          id="publishDateTime"
          value={post.publishDateTime}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSubmitPost}>
        Submit
      </Button>
    </Form>
  );
}
