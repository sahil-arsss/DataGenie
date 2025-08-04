import { GoogleGenAI } from "@google/genai";
import mysql from "mysql2";

// --- 🔐 Gemini API Setup ---
const API_KEY = "AIzaSyDeL9Z1teWnMRaKKQhMoEhnDw1ypbh9FLI";
const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- 🗃️ MySQL Setup ---
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "23120041",
  database: "SampleDB",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
    return;
  }
  console.log("✅ Connected to MySQL database!");
});

// --- 🤖 Function to Generate SQL ---
async function generateSQL(naturalPrompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Convert this to a SELECT SQL query for MySQL:\n"${naturalPrompt}". Only respond with the SQL query. Table: users(id, name, email)`,
  });

  let sql = response.text.trim();
  if (sql.startsWith("```")) {
    sql = sql
      .replace(/```(?:sql)?/gi, "")
      .replace(/```$/, "")
      .trim();
  }
  console.log("\n🔎 Generated SQL:\n", sql);

  // Optional safety check
  if (!sql.toLowerCase().startsWith("select")) {
    throw new Error("Only SELECT queries are allowed!");
  }

  return sql;
}

// --- 🧠 Main Logic ---
async function main() {
  const userPrompt = "Get all user names and emails";

  try {
    const sqlQuery = await generateSQL(userPrompt);

    connection.query(sqlQuery, (err, results) => {
      if (err) throw err;
      console.log('\n📤 Query Result:');
      console.table(results);

      // Close after query
      connection.end();
    });
    console.log(sqlQuery);
  } catch (error) {
    console.error("❌ Error:", error.message);
    connection.end();
  }
}

main();
