import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import * as fetch from "../../../modules/commentManager.js";
import { formatMDY } from "../../../helpers/formatDate.js";

export const Comment = ({ comment, getComments, user, postId }) => {
  const navigate = useNavigate();

  const handleDeleteClick = (commentId) => {
    if (window.confirm(`Are you sure you want to delete this comment`)) {
      fetch.deleteComment(commentId).then(() => {
        getComments(postId);
      });
    } else {
      alert("Comment was not deleted");
    }
  };

  return (
    <Card>
      <CardBody>
        <div>
          <h5>{comment.userProfile?.displayName}</h5>&nbsp;
          <p>{formatMDY(comment.createDateTime)}</p>
        </div>
        <p>{comment.subject}</p>
        <p>{comment.content}</p>
        {user?.id == comment.userProfileId ? (
          <Button onClick={() => navigate(`editcomment/${comment.id}`)}>
            Edit
          </Button>
        ) : (
          ""
        )}
        {user?.id == comment.userProfileId || user?.userTypeId == 1 ? (
          <Button onClick={() => handleDeleteClick(comment.id)}>Delete</Button>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default Comment;
