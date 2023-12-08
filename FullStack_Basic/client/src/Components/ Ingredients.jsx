import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../Config"
import axios from 'axios';

const Ingredients = () => {
  const [ingredientDishes, setIngredientDishes] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');

  useEffect(() => {
    // Fetch all ingredients
    axios.get(`${BASE_URL}/ingredients`)
      .then((response) => {
        // Handle data (list of ingredients)
        setAllIngredients(response.data.ingredients);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedIngredient !== '') {
      // Fetch dishes for the selected ingredient
      axios.get(`${BASE_URL}/ingredients/${selectedIngredient}`)
        .then((response) => {
          // Handle data (dishes for the ingredient)
          setIngredientDishes(response.data.dishes);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }
  }, [selectedIngredient]);

  const handleIngredientChange = (event) => {
    setSelectedIngredient(event.target.value);
  };

  return (
    <div>
      
      <select onChange={handleIngredientChange}>
        <option value="">Select an ingredient</option>
        {allIngredients.map((ingredient, index) => (
          <option key={index} value={ingredient}>{ingredient}</option>
        ))}
      </select>

      <h2>Dishes for Selected Ingredient</h2>
      <ul>
        {ingredientDishes.map((dish, index) => (
          <li key={index}>{dish}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;



