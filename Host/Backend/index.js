require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

app.get('/getUsers', async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows); // returns [{ phone: '123' }, { phone: '456' }, ...]
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving users from database' });
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});