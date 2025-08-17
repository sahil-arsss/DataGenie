import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDeL9Z1teWnMRaKKQhMoEhnDw1ypbh9FLI" });

export async function generateSQL(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Convert this to a MySQL SQL query. Only return SQL. Table: users(id, name, email ,age ,created_at)\n\n"${prompt}"`,
  });

  let sql = response.text.trim();
  
  if (sql.startsWith("```")) {
    sql = sql.replace(/```(?:sql)?/gi, "").replace(/```$/, "").trim();
  }
  if (!/^select\s+/i.test(sql)) {
    throw new Error("Only SELECT queries are allowed!");
  }

//   if (!sql.toLowerCase().startsWith("select")) {
//     throw new Error("Only SELECT queries are allowed!");
//   }

  return sql;
}
