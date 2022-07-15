import React from "react";
import "./Post.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { deletePost } from "../../modules/postManager";

//go pass in getPosts
export default function Post({ post, getPosts, user }) {
  const navigate = useNavigate();

  const handleDeleteClick = (postId) => {
    deletePost(postId).then(() => {
      getPosts();
    });
  };

  return (
    <div className="postCard">
      <h3 className="postCardTitle">{post.title}</h3>
      <Link to={`/posts/user/${post.userProfileId}`} className="postCardAuthor">
        {post.userProfile.firstName} {post.userProfile.lastName}
      </Link>
      <p className="postCardCategory">{post.category.name}</p>

            <div className="postButtons">
                <Button>
                    <Link className="postDetailsLink" to={`/posts/${post.id}`}>
                        <strong>Details</strong>
                    </Link>
                </Button>

                {user?.id == post.userProfileId ? <Button onClick={() => navigate(`./${post.id}/edit`)}>Edit</Button> : ""}
                {user?.id == post.userProfileId || user?.userTypeId == 1 ? <Button onClick={() => handleDeleteClick(post.id)}>Delete</Button> : ""}
            </div>

        </div>
    )
}
