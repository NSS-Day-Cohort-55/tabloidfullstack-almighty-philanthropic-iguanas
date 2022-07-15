import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import * as get from "../../modules/categoryManager.js";

export const Category = ({ category, getCategories }) => {
  const navigate = useNavigate();
  const handleDeleteClick = (categoryId) => {
    if (window.confirm(`Are you sure you want to delete this category`)) {
      get.deleteCategory(categoryId).then(() => {
        getCategories();
      });
    } else {
      alert("Category was not deleted");
    }
  };

  return (
    <Card>
      <CardBody>
        <p>{category.name}</p>
        <Button onClick={() => navigate(`./edit/${category.id}`)}>Edit</Button>
        <Button onClick={() => handleDeleteClick(category.id)}>Delete</Button>
      </CardBody>
    </Card>
  );
};

export default Category;
