const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// Get all draws
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM VietlottPower655 ORDER BY Date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert a new draw
router.post('/', async (req, res) => {
  const { date, period, numbers, extraNumber } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO VietlottPower655 (Date, Period, Numbers, ExtraNumber) VALUES ($1, $2, $3, $4) ON CONFLICT (Period) DO NOTHING; RETURNING *',
      [date, period, numbers, extraNumber]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;