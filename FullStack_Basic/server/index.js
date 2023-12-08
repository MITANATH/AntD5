/*const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

const buildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(buildPath));


//const mongoUrl = 'mongodb://127.0.0.1:27017';
const mongoUrl = 'mongodb://mongo:27017';
const mongoDbName = 'Dish_Details';

// MongoDB setup
const mongoClient = new MongoClient(mongoUrl);

// Connect to MongoDB
mongoClient
  .connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// API endpoint to insert a dish into MongoDB
app.post('/dishes', async (req, res) => {
  try {
    const { name, ingredients } = req.body.dishes;

    // Insert the dish into MongoDB
    const db = mongoClient.db(mongoDbName);
    const collection = db.collection('dishes');
    await collection.insertOne({ name, ingredients });

    res.sendStatus(201);
  } catch (error) {
    console.error('Error inserting dish and ingredients:', error);
    res.status(500).json({ error: 'An error occurred while inserting dish and ingredients.' });
  }
});

// API endpoint to get a dish with its ingredients from MongoDB
app.get('/dishes/:dishName', async (req, res) => {
  try {
    const dishName = req.params.dishName;

    // Retrieve the dish from MongoDB
    const db = mongoClient.db(mongoDbName);
    const collection = db.collection('dishes');
    const dish = await collection.findOne({ name: dishName });

    if (!dish) {
      res.status(404).json({ error: 'Dish not found.' });
      return;
    }

    res.json(dish);
  } catch (error) {
    console.error('Error retrieving dish:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the dish.' });
  }
});

// API endpoint to get all dishes from MongoDB
app.get('/dishes', async (req, res) => {
  try {
    // Retrieve all dishes from MongoDB
    const db = mongoClient.db(mongoDbName);
    const collection = db.collection('dishes');
    const dishes = await collection.find().toArray();

    res.json(dishes);
  } catch (error) {
    console.error('Error retrieving dishes:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the dishes.' });
  }
});

// Serve the 'index.html' file for all routes except the ones defined above
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(8000, () => {
  console.log('Server with MongoDB  is running on port 8000');
});*/




const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const mongo_url = require('./Config');
const pg= require('./pgconfig')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

const buildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(buildPath));

const mongoUrl = mongo_url;
//const mongoUrl = 'mongodb://mongo:27017';
//const mongoUrl = 'mongodb://172.19.0.2:27017'
const mongoDbName = 'Dishes';
const pgConfig = pg;

// MongoDB setup
const mongoClient = new MongoClient(mongoUrl);

// PostgreSQL setup
const pgPool = new Pool(pgConfig);

// Connect to MongoDB and PostgreSQL
Promise.all([mongoClient.connect(), pgPool.connect()])
  .then(() => {
    console.log('Connected to MongoDB and PostgreSQL');
  })
  .catch((err) => {
    console.error('Error connecting to databases:', err);
  });

// API endpoint to insert a dish into MongoDB and create records in PostgreSQL
app.post('/dishes', async (req, res) => {
  try {
    const { name, ingredients } = req.body.dishes;

    // Ensure ingredients is an array before proceeding
    if (!Array.isArray(ingredients)) {
      throw new Error('Ingredients must be an array');
    }

    // Insert the dish into MongoDB
    const db = mongoClient.db(mongoDbName);
    const collection = db.collection('dishes');
    await collection.insertOne({ name, ingredients });

    // Insert records into PostgreSQL
    const insertPromises = ingredients.map((ingredient) => {
      const query = {
        text: 'INSERT INTO ingredients (ingredient, dish_name) VALUES ($1, $2)',
        values: [ingredient, name],
      };
      return pgPool.query(query);
    });
    await Promise.all(insertPromises);

    res.sendStatus(201);
  } catch (error) {
    console.error('Error handling ingredients:', error);
    res.status(400).json({ error: 'Invalid ingredients data.' });
  }
});

// API endpoint to get a dish with its ingredients from MongoDB
app.get('/dishes/:dishName', async (req, res) => {
  try {
    const dishName = req.params.dishName;

    // Retrieve the dish from MongoDB
    const db = mongoClient.db(mongoDbName);
    const collection = db.collection('dishes');
    const dish = await collection.findOne({ name: dishName });

    if (!dish) {
      res.status(404).json({ error: 'Dish not found.' });
      return;
    }

    res.json(dish);
  } catch (error) {
    console.error('Error retrieving dish:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the dish.' });
  }
});

// API endpoint to get dishes for a single ingredient from PostgreSQL
app.get('/ingredients/:ingredient', async (req, res) => {
  try {
    const ingredient = req.params.ingredient;

    // Retrieve dishes from PostgreSQL
    const query = {
      text: 'SELECT * FROM ingredients WHERE ingredient = $1',
      values: [ingredient],
    };
    const result = await pgPool.query(query);

    const dishes = result.rows.map((row) => row.dish_name);

    res.json({ dishes });
  } catch (error) {
    console.error('Error retrieving dishes for ingredient:', error);
    res.status(500).json({ error: 'An error occurred while retrieving dishes for the ingredient.' });
  }
});

// API endpoint to get all dishes from MongoDB
app.get('/dishes', async (req, res) => {
try {
  // Retrieve all dishes from MongoDB
  const db = mongoClient.db(mongoDbName);
  const collection = db.collection('dishes');
  const dishes = await collection.find().toArray();

  res.json(dishes);
} catch (error) {
  console.error('Error retrieving dishes:', error);
  res.status(500).json({ error: 'An error occurred while retrieving the dishes.' });
}
});

// API endpoint to get all ingredients from PostgreSQL
app.get('/ingredients', async (req, res) => {
try {
  // Retrieve all ingredients from PostgreSQL
  const query = 'SELECT * FROM ingredients';
  const result = await pgPool.query(query);

  const ingredients = result.rows.map((row) => row.ingredient);

  res.json({ ingredients });
} catch (error) {
  console.error('Error retrieving ingredients:', error);
  res.status(500).json({ error: 'An error occurred while retrieving the ingredients.' });
}
});


// Serve the 'index.html' file for all routes except the ones defined above
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});


app.listen(8000, () => {
  console.log('Server with mongo + pg is running on port 8000');
});



