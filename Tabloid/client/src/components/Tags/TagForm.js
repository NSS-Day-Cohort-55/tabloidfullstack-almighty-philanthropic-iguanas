import { useState } from "react";
import { addTag } from "../../modules/tagManager";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const TagForm = (getTags) => {
    const [tag,setTag] =useState({
        name: ''
    })

    const navigate = useNavigate()

    const handleFieldChange = (event) => {
        const newTag = {...tag}
        let selectedVal = event.target.value
        newTag[event.target.id] = selectedVal
        setTag(newTag)
    }

    const handleSaveClick = (event) => {
        event.preventDefault();
        addTag(tag)
        .then(() => navigate('/tags'))
    }

    return (
        <div className="tagFromContainer">
            <form className="tagForm">
                <h2 className="tagForm__title">Add a Tag!</h2>
                <fieldset className="tagName">
                    <label htmlFor="tagName">Tag Name:</label>
                    <input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Tag Name" value={tag.name} />
                </fieldset>
                <Button type="button" onClick={handleSaveClick} className="saveTagButton">Save Tag</Button>
            </form>
        </div>
    )
}

export default TagForm