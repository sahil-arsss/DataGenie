import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "23120041",
  database: "SampleDB",
   multipleStatements: true,
});

connection.connect((err) => {
  if (err) console.error("MySQL Error:", err);
  else console.log("✅ MySQL Connected!");
});
