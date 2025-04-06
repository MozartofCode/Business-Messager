require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 4000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/makeUser', async (req, res) => {

  const { phone } =  req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {

    await pool.query('INSERT INTO customers (phone) VALUES ($1)', [String(phone)]);
    res.status(201).json({ message: 'User added successfully' });
    console.log("Successfully added to the database");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error inserting user into database' });
  }

});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});