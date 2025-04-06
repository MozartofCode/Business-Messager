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


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/getUsers', async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM customers');
    res.status(200).json(result.rows); // returns [{ phone: '123' }, { phone: '456' }, ...]
    console.log("Successfully returned all phone numbers");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving users from database' });
  }

});


// Endpoint to send SMS
app.post('/sendMessage', async (req, res) => {
  const { to, message } = req.body;

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    res.json({ success: true, sid: result.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});