import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
   multipleStatements: true,
});

connection.connect((err) => {
  if (err) console.error("MySQL Error:", err);
  else console.log("✅ MySQL Connected!");
});
