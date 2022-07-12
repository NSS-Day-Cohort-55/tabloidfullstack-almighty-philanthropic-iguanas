import React from "react";
import { Card, CardBody } from "reactstrap";
import { Button} from "reactstrap";
import { Link } from "react-router-dom";

const Tag = ({ tag }) => {


    return (
        <Card>
            <CardBody>
                <p className="text-left px-3">{tag.name}</p>
                <Link to={`tags/edit/${tag.id}`}>
                    <Button variant="secondary" size="sm">Edit</Button>
                </Link>
                <Link to={`tags/delete/${tag.id}`}>
                    <Button variant="secondery" size="sm">Delete</Button>
                </Link>
            </CardBody>
        </Card>
    )
}

export default Tag;