import { generateSQL } from "../services/geminiService.js";
import { connection } from "../db/mysql.js";

export async function handleQuery(req, res) {
  const { prompt } = req.body;
    
  try {
    const sql = await generateSQL(prompt);

    connection.query(sql, (err, results) => {
      if (err) {
        console.error("SQL Execution Error:", err);
        return res.status(500).json({ error: "Query execution failed" });
      }

      res.json({ sql, results });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
