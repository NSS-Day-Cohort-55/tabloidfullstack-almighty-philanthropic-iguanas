import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { getPost } from "../../../modules/postManager.js";
import { getCommentByPostId } from "../../../modules/commentManager.js";
import { Comment } from "./Comment.js";

export const CommentList = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  <Link to="/register">Register</Link>;

  const getComments = (id) => {
    getCommentByPostId(id).then((comments) => {
      setComments(comments);
    });
  };

  useEffect(() => {
    if (location.state != null) {
      setPost(location.state.post);
    } else {
      getPost(postId).then((post) => {
        setPost(post);
      });
    }
  }, []);

  useEffect(() => {
    if (post != null) {
      getComments(post.id);
    }
  }, [post]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h1>
          <Link to={`/posts/${post?.id}`}>{post?.title}</Link> Comments
        </h1>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            key={comment.id}
            getComments={getComments}
            postId={post.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};
