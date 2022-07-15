import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import * as get from "../../../modules/commentManager.js";
import { getPost, editPost } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";
import { Button } from "reactstrap";

export default function EditPost() {
    const [post, setPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        categoryId: 0,
    });
    const [categories, setCategories] = useState([]);
    const { postId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
            getPost(postId).then((post) => {
                setPost(post);
            })
    }, [])

    useEffect(() => {
        getAllCategories().then((cats) => {
            setCategories(cats);
        });
    }, []);

    const handleFieldChange = (evt) => {
        const stateToChange = { ...post };
        stateToChange[evt.target.id] = evt.target.value;
        setPost(stateToChange);
    };

    const handleEditPost = () => {
        if (post.title !== "" && post.content !== "" && post.categoryId !== 0) {
            console.log(post.isActive);
            editPost(post).then(() => {
                navigate(`/posts`);
            });
        } else {
        alert("Please enter post info");
        }
    };


    return (
        <div className="form-wrapper">

            <div className="form-input">
                <label htmlFor="title">Title:</label>
                <input
                type="text"
                required
                autoFocus
                onChange={handleFieldChange}
                id="title"
                value={post?.title}
                />
            </div>
            <div className="form-input">
                <label htmlFor="content">Content:</label>
                <input
                type="text"
                required
                autoFocus
                onChange={handleFieldChange}
                id="content"
                value={post?.content}
                />
            </div>
            <div className="form-input">
                <label htmlFor="imageLocation">Image Location:</label>
                <input
                type="text"
                required
                autoFocus
                onChange={handleFieldChange}
                id="imageLocation"
                value={post?.imageLocation}
                />
            </div>
            <div className="form-input">
                <label htmlFor="categoryId">Category:</label>
                <select value={post?.categoryId} name="categoryId" id="categoryId" onChange={handleFieldChange}>
                        <option value="0">Select Category</option>
                        {categories.map(c=> (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                </select>
            </div>

            <Button onClick={handleEditPost}>Submit</Button>

        </div>
    );
};
