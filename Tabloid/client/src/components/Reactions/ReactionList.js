import React, { useState, useEffect } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Reaction } from "./Reaction.js";
import { CreateReaction } from "./CreateReaction.js";
import * as get from "../../modules/reactionManager.js";

export const ReactionList = ({}) => {
  const [reactions, setReactions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getReactions = () => {
    if (location.state != null) {
      setReactions(location.state.reactions);
    } else {
      get.getAllReactions().then((reactions) => {
        setReactions(reactions);
      });
    }
  };

  useEffect(() => {
    getReactions();
  }, []);

  return (
    <div className="container">
      <Button
        onClick={() =>
          navigate("./createreaction", { state: { reactions: reactions } })
        }
      >
        Create Reaction
      </Button>
      <div className="row justify-content-center">
        {reactions.map((reaction) => (
          <Reaction
            reaction={reaction}
            key={reaction.id}
            getReactions={getReactions}
          />
        ))}
      </div>
    </div>
  );
};
