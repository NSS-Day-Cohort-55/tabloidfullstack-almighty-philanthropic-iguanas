import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import * as get from "../../modules/categoryManager.js";

export const CreateCategory = ({ props }) => {
  const [createdCategory, setCreatedCategory] = useState({
    name: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
      setCategories(location.state.categories);
    } else {
      get.getAllCategories().then((categories) => {
        setCategories(categories);
      });
    }
  }, []);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...createdCategory };
    stateToChange[evt.target.id] = evt.target.value;
    setCreatedCategory(stateToChange);
  };

  const handleCreateCategory = (evt) => {
    if (
      categories.find(
        (e) => e.name.toLowerCase() === createdCategory.name.toLowerCase()
      ) === undefined
    ) {
      get.addCategory(createdCategory);
      navigate("/categories");
    } else {
      alert("This category has already been created.");
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
          value={createdCategory.name}
        />
      </div>
      <div className="popup-buttons">
        <Button onClick={handleCreateCategory}>Create</Button>
      </div>
    </div>
  );
};
