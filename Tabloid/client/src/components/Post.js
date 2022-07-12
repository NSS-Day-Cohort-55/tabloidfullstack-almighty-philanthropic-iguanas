import React from "react";
import "./Post.css";

export default function Post({post}) {
    console.log(post)
    return (
        <div className="postCard">
            <h3 className="postCardTitle">{post.title}</h3>
            <p className="postCardAuthor">{post.userProfile.fullName}</p>
            <p className="postCardCategory">{post.category.name}</p>
        </div>
    )
}
