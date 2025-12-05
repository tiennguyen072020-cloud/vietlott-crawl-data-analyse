const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
// // Middleware: chạy sau khi pool tạo kết nối
// pool.on('connect', async (client) => {
//   try {
//     await client.query("SET datestyle TO ISO, MDY");
//     console.log("Datestyle set to ISO, MDY");
//   } catch (err) {
//     console.error("Error setting datestyle:", err);
//   }
// });
module.exports = pool;