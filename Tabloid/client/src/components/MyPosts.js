import React, {useEffect, useState} from "react";
import Post from "./Post";
import {getUsersPosts} from "../modules/postManager";

export default function MyPosts() {
    const [myPosts, setMyPosts] = useState([]);

    //NEED TO PASS IN USERID ONCE WE FIGURE OUT HOW TO GET FROM FIREBASE
    const getMyPosts = () => {
        getUsersPosts().then((posts) => setMyPosts(posts));
    }

    useEffect(() => {
        getMyPosts();
    }, [])

    return (
        <div className="postListContainer">
            {myPosts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )

}