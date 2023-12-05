import React, { useState } from 'react';
import axios from 'axios';

const AddDishForm = () => {
  const [newDish, setNewDish] = useState({ name: '', ingredients: [] }); // Set ingredients as an empty array initially

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'ingredients') {
      // Split the input string by commas to create an array of ingredients
      const ingredientsArray = value.split(',').map((ingredient) => ingredient.trim());
      setNewDish({ ...newDish, [name]: ingredientsArray });
    } else {
      setNewDish({ ...newDish, [name]: value });
    }
  };

  const addNewDish = () => {
    axios.post('http://localhost:8000/dishes', { dishes: newDish })
      .then((response) => {
        alert('Dish added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding new dish:', error);
      });
  };

  return (
    <div>
      
      <div>
        <input type="text" name="name" placeholder="Dish Name" onChange={handleInputChange} />
        <input type="text" name="ingredients" placeholder="Ingredients" onChange={handleInputChange} />
        <button onClick={addNewDish}>Add Dish</button>
      </div>
    </div>
  );
};

export default AddDishForm;

