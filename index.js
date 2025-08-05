import express from "express";
import dotenv from "dotenv";
import queryRoutes from "./routes/queryRoutes.js";
// import transcribeRoutes from "./routes/transcribeRoutes.js"
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html from /views
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use("/api", queryRoutes);
// app.use("/api", transcribeRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// server.js or routes/api.js




