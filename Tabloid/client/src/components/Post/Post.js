import React from "react";
import "./Post.css";
import {Link, useNavigate} from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import {deletePost} from "../../modules/postManager";

//go pass in getPosts
export default function Post({post, getPosts}) {
    
    const navigate = useNavigate();

    const handleDeleteClick = (postId) => {
        deletePost(postId).then(() => {
            getPosts();
        });
    };
    
    return (
        <div className="postCard">
            <h3 className="postCardTitle">{post.title}</h3>
            <p className="postCardAuthor">{post.userProfile.firstName} {post.userProfile.lastName}</p>
            <p className="postCardCategory">{post.category.name}</p>

            <Link to={`/posts/${post.id}`}>
                <strong>Details</strong>
            </Link>

            <div className="postEditAndDeleteButtonsContainer">
                <Button onClick={() => navigate(`./edit/${post.id}`)}>Edit</Button>
                <Button onClick={() => handleDeleteClick(post.id)}>Delete</Button>

            </div>
        </div>
    )
}
