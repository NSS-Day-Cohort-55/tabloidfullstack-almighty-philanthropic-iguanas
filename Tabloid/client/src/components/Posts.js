import React, {useEffect, useState} from "react";
import Post from "./Post";
import {getAllPosts} from "../modules/postManager";

export default function Posts () {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllPosts().then((posts) => setPosts(posts));
    }

    useEffect(() => {
        getPosts();
    }, [])

    console.log(posts);


    return (
        <div className="postListContainer">
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}
