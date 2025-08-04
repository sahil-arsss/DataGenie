// server.js or routes/api.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '23120041',
  database: 'SampleDB1'
});

connection.connect((err) => {
  if (err) console.error('MySQL Error:', err);
  else console.log('✅ MySQL Connected!');
});

app.get('/api/departments', (req, res) => {
  const sql = `
    SELECT department, COUNT(*) as user_count
    FROM users
    GROUP BY department
    HAVING user_count > 25
  `;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results); // [{ department: 'IT', user_count: 30 }, ...]
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));
