import { getAllTags } from "../../modules/tagManager";
import Tag from "./Tag.js"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const TagList = () => {
    const [tags, setTags] = useState([]);

    const navigate = useNavigate()

    const getTags = () => {
        getAllTags()
        .then(tags => setTags(tags))
    }

    const handleNavigateAddTag = (event) => {
        event.preventDefault()
        navigate('/tags/add')
    }

    useEffect(() => {
        getTags();
    }, []);

    return (
        <>
        <h3>Tags</h3>
        <div className="tag-container">
            <div className="row justify-content-left">
                {tags.map((tag) => (
                    <Tag tag={tag} key={tag.id} />
                ))}
            </div>
            <Button type="button" onClick={handleNavigateAddTag} className="saveTagButton">Add Tag</Button>
        </div>
        </>
    )
}

export default TagList;