import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import * as get from "../../modules/categoryManager.js";

export const Category = ({ category, getCategories }) => {
  const handleDeleteClick = (categoryId) => {
    get.deleteCategory(categoryId).then(() => {
      getCategories();
    });
  };

  return (
    <Card>
      <CardBody>
        <p>{category.name}</p>
        <Button>Edit</Button>
        <Button onClick={() => handleDeleteClick(category.id)}>Delete</Button>
      </CardBody>
    </Card>
  );
};

export default Category;
