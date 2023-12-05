import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleDish = () => {
  const [selectedDish, setSelectedDish] = useState('');
  const [singleDish, setSingleDish] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/dishes')
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dishes:', error);
      });
  }, []);

  const handleSelect = (event) => {
    setSelectedDish(event.target.value);
  };

  const getSingleDish = () => {
    axios.get(`http://localhost:8000/dishes/${selectedDish}`)
      .then((response) => {
        setSingleDish(response.data);
      })
      .catch((error) => {
        console.error('Error fetching single dish:', error);
      });
  };

  return (
    <div>
      <h2>Get a Single Dish</h2>
      <div>
        <select onChange={handleSelect}>
          <option value="">Select a dish</option>
          {dishes.map((dish) => (
            <option key={dish._id} value={dish.name}>{dish.name}</option>
          ))}
        </select>
        <button onClick={getSingleDish}>Get Dish</button>
      </div>

      {singleDish && (
        <div>
          <h2>{singleDish.name}</h2>
          <p>Ingredients: {singleDish.ingredients}</p>
        </div>
      )}
    </div>
  );
};

export default SingleDish;

