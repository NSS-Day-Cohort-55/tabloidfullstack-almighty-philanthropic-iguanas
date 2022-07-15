import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const Reaction = ({ reaction }) => {
  return (
    <Card>
      <CardBody>
        <p>{reaction.name}</p>
        <img src={reaction.imageLocation} alt="reaction-image" />
      </CardBody>
    </Card>
  );
};
