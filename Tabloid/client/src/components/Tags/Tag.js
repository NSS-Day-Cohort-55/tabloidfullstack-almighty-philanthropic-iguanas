import React from "react";
import { Card } from "reactstrap";

const Tag = ({ tag }) => {
    return (
        <Card>
        <p className="text-left px-3">{tag.name}</p>
        </Card>
    )
}

export default Tag;