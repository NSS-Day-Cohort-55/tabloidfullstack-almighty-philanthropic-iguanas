import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as get from "../../../modules/commentManager.js";
import { Button } from "reactstrap";
import { getPost } from "../../../modules/postManager.js";

export const CreateComment = ({ user }) => {
  const { postId } = useParams();
  const [comment, setComment] = useState({
    subject: "",
    content: "",
    userProfileId: user ? user.Id : null,
    postId: postId,
  });
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getPost(postId).then((post) => {
      setPost(post);
    });
  }, []);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...comment };
    stateToChange[evt.target.id] = evt.target.value;
    setComment(stateToChange);
  };

  const handleCreateComment = (evt) => {
    if (comment.subject !== "" && comment.content !== "") {
      comment.userProfileId = user.id;
      get.addComment(comment).then((comment) => {
        navigate(`../posts/${post.id}/comments`, { state: { post: post } });
      });
    } else {
      alert("Please enter info for this comment");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-input">
        <label htmlFor="name">Comment Subject:</label>
        <input
          type="text"
          required
          autoFocus
          onChange={handleFieldChange}
          id="subject"
          value={comment.subject}
        />
      </div>
      <div className="form-input">
        <label htmlFor="name">Comment Content:</label>
        <input
          type="text"
          required
          autoFocus
          onChange={handleFieldChange}
          id="content"
          value={comment.content}
        />
      </div>
      <div className="popup-buttons">
        <Button onClick={handleCreateComment}>Save</Button>
        <Button
          onClick={() =>
            navigate(`../posts/${post.id}/comments`, { state: { post: post } })
          }
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
