import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import * as get from "../../modules/reactionManager.js";

export const CreateReaction = ({ props }) => {
  const [createdReaction, setCreatedReaction] = useState({
    name: "",
    imageLocation: "",
  });
  const [reactions, setReactions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
      setReactions(location.state.reactions);
    } else {
      get.getAllReactions().then((reactions) => {
        setReactions(reactions);
      });
    }
  }, []);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...createdReaction };
    stateToChange[evt.target.id] = evt.target.value;
    setCreatedReaction(stateToChange);
  };

  const handleCreateReaction = (evt) => {
    if (
      reactions.find(
        (e) => e.name.toLowerCase() === createdReaction.name.toLowerCase()
      ) === undefined
    ) {
      get.addReaction(createdReaction);
      navigate("/reactions");
    } else {
      alert("This reaction has already been created.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-input">
        <label htmlFor="name">Reaction Name:</label>
        <input
          type="text"
          required
          autoFocus
          onChange={handleFieldChange}
          id="name"
          value={createdReaction.name}
        />
      </div>
      <div className="form-input">
        <label htmlFor="name">Reaction Image Url:</label>
        <input
          type="text"
          required
          autoFocus
          onChange={handleFieldChange}
          id="imageLocation"
          value={createdReaction.imageLocation}
        />
      </div>
      <div className="popup-buttons">
        <Button onClick={handleCreateReaction}>Create</Button>
      </div>
    </div>
  );
};
