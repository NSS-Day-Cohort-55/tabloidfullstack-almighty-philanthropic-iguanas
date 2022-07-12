import React, { useState, useEffect } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Category } from "./Category.js";
import { CreateCategory } from "./CreateCategory.js";
import * as get from "../../modules/categoryManager.js";

export const CategoryList = ({}) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = () => {
    return get.getAllCategories().then((categories) => {
      setCategories(categories);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container">
      <Button
        onClick={() =>
          navigate("./createcategory", { state: { categories: categories } })
        }
      >
        Create Category
      </Button>
      <div className="row justify-content-center">
        {categories.map((category) => (
          <Category
            category={category}
            key={category.id}
            getCategories={getCategories}
          />
        ))}
      </div>
    </div>
  );
};
