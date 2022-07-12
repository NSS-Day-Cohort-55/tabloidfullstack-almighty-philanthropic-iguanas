import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../modules/postManager";
import {RemoveTimeFromDateTime} from "../helpers/formatDate";

export default function PostDetails() {
    
    const [post, setPost] = useState();
    const { id } = useParams();

    useEffect(() => {
        getPost(id).then(setPost)
    }, [])

    if(!post) {
        return null;
    }

    post.publishDateTime = RemoveTimeFromDateTime(post.publishDateTime);

    return (
        <div className="postDetailsContainer">

            <h2>{post.title}</h2>

            <div className="postImage">
                {post.imageUrl?.map(() => (
                     <iframe className="video"
                            src={post.imageUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen /> ))}
            </div>

            <div className="postContentPublishDateAuthorName">
                <p> {post.content} </p>
                <p> {post.publishDateTime} </p>
                <p> {post.userProfile.fullName} </p>
            </div>

        </div>
    )
}