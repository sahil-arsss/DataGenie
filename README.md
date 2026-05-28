<img width="1919" height="1030" alt="image" src="https://github.com/user-attachments/assets/f22ab354-64db-40ad-9e4c-ebe826849371" />
# Data Genie – Natural Language to SQL Query System

Data Genie is an AI-powered web application that allows users to ask questions in natural language and converts those questions into SQL queries. The backend sends the user prompt to an AI service, generates an SQL query, executes it on a MySQL database, and returns the result to the user.

The project also includes support for audio-to-text functionality, where user speech can be converted into text and then used for query generation.

---

## Project Overview

Writing SQL queries can be difficult for users who do not know database syntax. Data Genie solves this problem by allowing users to type a normal English question such as:

```text
Show all students whose marks are greater than 80
```

The backend converts it into an SQL query like:

```sql
SELECT * FROM students WHERE marks > 80;
```

Then the query is executed on the connected MySQL database and the result is returned to the user.

---

## Features

- Natural language to SQL query generation
- AI API integration using Gemini
- MySQL database connectivity
- Query execution from backend
- REST API for handling user prompts
- Static frontend served using Express
- Audio-to-text service support
- Clean controller-route-service structure
- Environment variable based configuration
- Basic error handling for API and database operations

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MySQL

### AI Service
- Gemini API

### Frontend
- HTML
- CSS
- JavaScript

### Tools
- Git
- GitHub
- Postman
- VS Code
- dotenv
- npm

---

## Folder Structure

```text
DataGenie/
│
├── controllers/
│   ├── queryController.js
│   └── transcribeController.js
│
├── db/
│   └── mysql.js
│
├── public/
│   └── style.css
│
├── routes/
│   ├── queryRoutes.js
│   └── transcribeRoutes.js
│
├── services/
│   ├── audioTotext.js
│   └── geminiService.js
│
├── uploads/
│
├── views/
│   └── index.html
│
├── .gitignore
├── README.md
├── package.json
└── server.js
```

---

## How It Works

```text
User enters a question
        |
        v
Frontend sends prompt to backend API
        |
        v
Express route receives request
        |
        v
Controller passes prompt to Gemini service
        |
        v
Gemini converts natural language into SQL
        |
        v
Backend executes SQL query on MySQL database
        |
        v
Result is returned to frontend as JSON
```

---

## Server Setup

The Express server is configured in `server.js`.

```javascript
import express from "express";
import dotenv from "dotenv";
import queryRoutes from "./routes/queryRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/api", queryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sahil-arsss/DataGenie.git
cd DataGenie
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start MySQL Server

Make sure your MySQL server is running and your database exists.

Example:

```sql
CREATE DATABASE data_genie;
USE data_genie;
```

---

## Sample Database Table

You can create a sample table for testing.

```sql
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    branch VARCHAR(100),
    marks INT,
    city VARCHAR(100)
);
```

```sql
INSERT INTO students (name, branch, marks, city)
VALUES
('Rahul Sharma', 'IT', 85, 'Delhi'),
('Aman Verma', 'CSE', 72, 'Mumbai'),
('Priya Singh', 'IT', 91, 'Bangalore'),
('Neha Gupta', 'ECE', 67, 'Pune');
```

---

## Run the Project

For normal start:

```bash
npm start
```

For development mode:

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

Open this URL in your browser.

---

## API Endpoints

### Generate and Execute SQL Query

```http
POST /api/query
```

### Request Body

```json
{
  "prompt": "Show all students from IT branch"
}
```

### Example Generated SQL

```sql
SELECT * FROM students WHERE branch = 'IT';
```

### Example Response

```json
{
  "success": true,
  "sql": "SELECT * FROM students WHERE branch = 'IT';",
  "data": [
    {
      "id": 1,
      "name": "Rahul Sharma",
      "branch": "IT",
      "marks": 85,
      "city": "Delhi"
    },
    {
      "id": 3,
      "name": "Priya Singh",
      "branch": "IT",
      "marks": 91,
      "city": "Bangalore"
    }
  ]
}
```

---

## Audio-to-Text Support

The project structure also includes audio transcription support:

```text
controllers/transcribeController.js
routes/transcribeRoutes.js
services/audioTotext.js
uploads/
```

This can be used to accept audio input, convert it into text, and then use the generated text as a natural language database query.

Currently, the transcribe route is commented in `server.js`:

```javascript
// import transcribeRoutes from "./routes/transcribeRoutes.js"
// app.use("/api", transcribeRoutes);
```

To enable it, uncomment these lines after configuring the transcription service.

---

## Important Backend Files

### `server.js`

Main entry point of the application. It configures Express, serves static files, connects routes, and starts the server.

### `db/mysql.js`

Handles MySQL database connection.

### `controllers/queryController.js`

Handles request and response logic for natural language query processing.

### `routes/queryRoutes.js`

Defines API routes related to query generation and execution.

### `services/geminiService.js`

Handles communication with Gemini API and converts user prompts into SQL queries.

### `public/style.css`

Contains styling for the frontend page.

### `views/index.html`

Main frontend page served by Express.

---

## Query Safety

Since the project generates SQL using AI, query safety is very important.

Recommended safety rules:

- Allow only `SELECT` queries
- Block destructive commands like:
  - `DROP`
  - `DELETE`
  - `TRUNCATE`
  - `ALTER`
  - `UPDATE`
  - `INSERT`
- Prevent multiple SQL statements
- Use a read-only MySQL user
- Validate generated SQL before execution
- Log generated queries for debugging

Example unsafe commands to block:

```text
DROP TABLE users;
DELETE FROM students;
TRUNCATE TABLE orders;
ALTER TABLE employees;
```

---

## Example Use Cases

- Ask database questions without writing SQL
- Build AI-powered admin dashboards
- Create internal business intelligence tools
- Help beginners learn SQL
- Query student, employee, sales, or product databases
- Convert voice input into database queries

---

## Screenshots

Add your project screenshots here.

### Home Page

```markdown
![Home Page](screenshots/home.png)
```

### Query Result

```markdown
![Query Result](screenshots/result.png)
```

### Generated SQL Output

```markdown
![Generated SQL](screenshots/sql-output.png)
```

---

## Future Improvements

- Add React frontend
- Add user authentication
- Add query history
- Add schema preview before query generation
- Add chart generation from query results
- Add CSV export
- Add support for PostgreSQL
- Add role-based access control
- Add Docker setup
- Add better SQL validation layer
- Add read-only database mode
- Add query explanation feature

---

## Resume Description

```text
Data Genie – Natural Language to SQL Query System
Built an AI-assisted backend system where users enter natural language questions and the server converts them into executable SQL queries using Gemini API. Designed API flow for prompt handling, SQL generation, query validation, MySQL database execution, and structured JSON responses with backend safeguards for controlled database access.
```

---

## Author

**Sahil Chaudhary**

- GitHub: [sahil-arsss](https://github.com/sahil-arsss)
- LinkedIn: [Sahil Chaudhari](https://www.linkedin.com/in/sahil-chaudhary-5702b5284/)
