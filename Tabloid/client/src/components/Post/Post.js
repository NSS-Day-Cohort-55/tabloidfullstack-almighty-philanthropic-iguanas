import React from "react";
import "./Post.css";
import {Link} from "react-router-dom";

export default function Post({post}) {
    return (
        <div className="postCard">
            <h3 className="postCardTitle">{post.title}</h3>
            <p className="postCardAuthor">{post.userProfile.firstName} {post.userProfile.lastName}</p>
            <p className="postCardCategory">{post.category.name}</p>

            <Link to={`/posts/${post.id}`}>
                <strong>Details</strong>
            </Link>
        </div>
    )
}
