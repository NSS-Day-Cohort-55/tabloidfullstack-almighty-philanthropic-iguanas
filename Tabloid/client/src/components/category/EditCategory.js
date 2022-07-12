import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as get from "../../modules/categoryManager.js";
import { Button } from "reactstrap";

export const EditCategory = ({}) => {
  const [category, setCategory] = useState({
    id: 0,
    name: "",
  });
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    get.getCategory(categoryId).then((category) => {
      setCategory(category);
    });
  }, []);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...category };
    stateToChange[evt.target.id] = evt.target.value;
    setCategory(stateToChange);
  };

  const handleEditCategory = (evt) => {
    if (category.name !== "") {
      get.editCategory(category).then((category) => {
        navigate("/categories");
      });
    } else {
      alert("Please enter a name for this category");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-input">
        <label htmlFor="name">Category Name:</label>
        <input
          type="text"
          required
          autoFocus
          onChange={handleFieldChange}
          id="name"
          value={category.name}
        />
      </div>
      <div className="popup-buttons">
        <Button onClick={handleEditCategory}>Edit</Button>
      </div>
    </div>
  );
};
