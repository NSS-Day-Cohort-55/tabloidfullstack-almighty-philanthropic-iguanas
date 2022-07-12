import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTag, updateTag } from "../../modules/tagManager";
import { Button } from "reactstrap";

export const TagEditForm = () => {
    const[isLoading, setIsLoading] = useState(true)
    const [tag, setTag] = useState(
        {
            name: ''
        }
    );

    const navigate = useNavigate();
    const { id } = useParams();

    const handleFieldChange = evt => {
        const stateToChange = {...tag}
        stateToChange[evt.target.id] = evt.target.value
        setTag(stateToChange)
    }

    const handleUpdate = (evt) => {
        evt.preventDefault()
        const editedTag = {
            id: id,
            name: tag.name
        }
        if(editedTag.name === "")
        {
            window.alert("WHOA! HEY STOP! ENTER A NAME, PLEASE!")
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
            updateTag(editedTag)
            .then(()=> navigate("/"))
        }
    }

    useEffect(()=> {
        getTag(id)
        .then(res => setTag(res))
        .then(setIsLoading(false))
    }, []);

    return (
        <div className="form-wrapper">
          <div className="form-input">
            <label htmlFor="name" >Tag Name:</label>
            <input
              type="text"
              placeholder={tag.name}
              required
              autoFocus
              onChange={handleFieldChange}
              id="name"
              value={tag.name}
            />
          </div>
          <div className="popup-buttons">
            <Button onClick={handleUpdate}>Submit</Button>
          </div>
        </div>
      );

}