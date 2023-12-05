import React from 'react'
import DishesList from './Components/DishesList'
import AddDishForm from './Components/AddDishForm.jsx'
import SingleDish from './Components/SingleDish.jsx'
import Ingredients from './Components/ Ingredients'

const App = () => {
  const bounceAnimation = {
    '@keyframes bounce': {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-10px)', // Adjust the value to control the bounce height
      },
    },
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{
        textAlign: 'center',
        color: '#800000',
        animation: 'bounce 2s infinite', // Applying bounce animation to the heading
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      }}>BABA'S DHABA</h1>
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-40px); /* Adjust the value to control the bounce height */
          }
        }
      `}</style>
      

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '45%', backgroundColor: '#F5F5F5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#3F51B5', borderBottom: '2px solid #3F51B5' }}>List of Dishes</h2>
          <DishesList />
        </div>
        <div style={{ width: '45%', backgroundColor: '#F5F5F5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#3F51B5', borderBottom: '2px solid #3F51B5' }}>Add a Dish</h2>
          <AddDishForm />
        </div>
      </div>
      <div style={{ marginTop: '40px' }}>
        <SingleDish />
      </div>
      <div style={{ marginTop: '40px', backgroundColor: '#F5F5F5', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ color: '#3F51B5', borderBottom: '2px solid #3F51B5' }}>Ingredients</h2>
        <Ingredients />
      </div>
    </div>
  );
};


export default App
