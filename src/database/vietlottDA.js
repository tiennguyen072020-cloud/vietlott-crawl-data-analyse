const pool = require('../database/db');


async function insertVietlottMega645Result(date, period, numbers) {
      
    try {
    const query = `

      INSERT INTO VietlottMega645 (Date, Period, Numbers)
      VALUES (to_date($1, 'DD/MM/YYYY'), $2, $3)
      ON CONFLICT (Period) DO NOTHING
      RETURNING *;
    `;
  
    const values = [date, period, numbers];
    const result = await pool.query(query, values);
    return result.rows[0]; // trả về bản ghi vừa insert
  } catch (err) {
    console.error('Error inserting Vietlott result:', err);
    throw err;
  }
}

// Hàm insert kết quả Vietlott
async function insertVietlottPower655Result(date, period, numbers, extraNumber) {
      
    try {
    const query = `

      INSERT INTO VietlottPower655 (Date, Period, Numbers, ExtraNumber)
      VALUES (to_date($1, 'DD/MM/YYYY'), $2, $3, $4)
      ON CONFLICT (Period) DO NOTHING
      RETURNING *;
    `;

     const values = [date, period, numbers, extraNumber];
     const result = await pool.query(query, values);
     return result.rows[0]; // trả về bản ghi vừa insert
    return null;
  } catch (err) {
    console.error('Error inserting Vietlott result:', err);
    throw err;
  }
}


module.exports = { insertVietlottPower655Result,insertVietlottMega645Result };