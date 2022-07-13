import React from "react";
import { Card, CardBody } from "reactstrap";
import { Button} from "reactstrap";
import { Link } from "react-router-dom";
import { deleteTag, getAllTags } from "../../modules/tagManager";

const Tag = ({ tag }) => {

    const handleDeleteClick = (tagId) => {
        deleteTag(tagId).then(() => {
          getAllTags();
        });
    }
    return (
        <Card>
            <CardBody>
                <p className="text-left px-3">{tag.name}</p>
                <Link to={`edit/${tag.id}`}>
                    <Button variant="secondary" size="sm">Edit</Button>
                </Link>
                <Link to={`/`}>
                <Button variant="secondary" size="sm" onClick={() => handleDeleteClick(tag.id)}>Delete</Button>
                </Link>
            </CardBody>
        </Card>
    )
}

export default Tag;