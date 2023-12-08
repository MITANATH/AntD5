import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from "../Config"


const DishesList = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/dishes`)
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dishes:', error);
      });
  }, []);

  return (
    <div>
      
      <ul>
        {dishes.map((dish) => (
          <li key={dish._id}>{dish.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DishesList;
