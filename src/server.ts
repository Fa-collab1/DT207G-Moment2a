const fs = require("fs");
const path = require("path");
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

require("dotenv").config(); // Detta läser min .env-fil och gör variablerna tillgängliga

function createTableIfNotExists() {
  const createTableScriptPath = path.join(__dirname, "create_table.sql");
  const createTableScript = fs.readFileSync(createTableScriptPath, "utf8");

  pool.query(createTableScript, (error: Error, results: any) => {
    if (error) {
      console.error("Error creating table:", error);
    } else {
      console.log("Table successfully created! (or already existing)");
    }
  });
}

const { Pool } = require("pg"); // Använder pg-paketet för att skapa en databasklient
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Använder DATABASE_URL från min .env (och Heroku använder en egen sådan variabel så .env-filen inte exponeras och därmed inte är synlig för andra då den inte laddas upp till GitHub)
  ssl: {
    rejectUnauthorized: false,
  },
});

const express = require("express"); // Använder express för att skapa en server
const cors = require("cors"); // Använder cors för att tillåta cross-origin requests
const app = express(); // Skapar en instans av express
const port = process.env.PORT || 3001;


app.set("view engine", "ejs"); // Ange EJS som vy-motorn
app.use(express.static("public")); // Ange mapp för statiska filer
app.use(express.urlencoded({ extended: true })); // Middleware för att tolka URL

app.use(express.json()); // Middleware för att tolka JSON
app.use(cors()); // Middleware för att tillåta cross-origin requests

app.get("/get/:id?", (req: any, res: any) => {
  const id = req.params.id;

  if (id) {
    // Om ett ID har tillhandahållits, hämta den specifika raden med det ID:et
    if (!/^\d+$/.test(id)) {
      res.status(401).json({ message: "ID (integer) is required" });
      return;
    }
    pool.query(
      "SELECT id, companyname, jobtitle, location, TO_CHAR(startdate, 'YYYY-MM-DD') AS startdate, TO_CHAR(enddate, 'YYYY-MM-DD') AS enddate, description FROM workexperience WHERE id = $1",
      [id],
      (error: any, results: any) => {
        if (error) {
          res.status(500).json({ error: "Database error" });
        } else if (results.rows.length > 0) {
          res.status(200).json(results.rows[0]); // Skicka bara första raden
        } else {
          res.status(404).json({ message: "Requested post not found" });
        }
      }
    );
  } else {
    // Om ingen ID-parameter har tillhandahållits, hämta alla rader
    pool.query(
      "SELECT id, companyname, jobtitle, location, TO_CHAR(startdate, 'YYYY-MM-DD') AS startdate, TO_CHAR(enddate, 'YYYY-MM-DD') AS enddate, description FROM workexperience ORDER BY enddate DESC, startdate DESC, id DESC",
      (error: any, results: any) => {
        if (error) {
          res.status(500).json({ error: "Database error" });
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  }
});

app.post("/post", (req: any, res: any) => {
  let { companyname, jobtitle, location, startdate, enddate, description } =
    req.body;
  let error: string[] = [];

  // Skicka en SQL-förfrågan till databasen för att infoga en ny rad

  if (companyname.length < 1 || !companyname) {
    error.push("Company name is required");
  }
  if (jobtitle.length < 1 || !jobtitle) {
    error.push("Job title is required");
  }
  if (location.length < 1 || location === null) {
    error.push("Location is required");
  }
  if (!startdate || startdate.length < 1 || !dateRegex.test(startdate)) {
    error.push("Start date in a valid format is required");
  }
  if (!enddate || enddate.length < 1) {
    enddate = null;
  } else if (!dateRegex.test(enddate)) {
    error.push("End date is not in a valid format");
  }
  if (!description || description.length < 1) {
    description = null;
  }

  if (error.length > 0) {
    return res.status(400).json({ error: error });
  }

  pool.query(
    "INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES ($1, $2, $3, $4, $5, $6)",
    [companyname, jobtitle, location, startdate, enddate, description],
    (error: any, results: any) => {
      if (error) {
        res.status(500).json({ error: "Database problem, request failed!" });
      } else {
        res.status(201).json({ message: "Work experience added successfully" });
      }
    }
  );
});

app.put("/put/:id", (req: any, res: any) => {
  const id = req.params.id;
  let { companyname, jobtitle, location, startdate, enddate, description } =
    req.body;
  let error: string[] = [];

  // Skicka en SQL-förfrågan till databasen för att infoga en ny rad

  if (!/^\d+$/.test(id)) {
    res.status(401).json({ message: "ID (integer) is required" });
    return;
  }
  if (companyname.length < 1 || !companyname) {
    error.push("Company name is required");
  }
  if (jobtitle.length < 1 || !jobtitle) {
    error.push("Job title is required");
  }
  if (location.length < 1 || location === null) {
    error.push("Location is required");
  }
  if (!startdate || startdate.length < 1 || !dateRegex.test(startdate)) {
    error.push("Start date in a valid format is required");
  }
  if (!enddate || enddate.length < 1) {
    enddate = null;
  } else if (!dateRegex.test(enddate)) {
    error.push("End date is not in a valid format");
  }
  if (!description || description.length < 1) {
    description = null;
  }

  if (error.length > 0) {
    return res.status(400).json({ error: error });
  }

  // Skicka en SQL-förfrågan till databasen för att uppdatera en rad med ett visst ID
  pool.query(
    "UPDATE workexperience SET companyname = $1, jobtitle = $2, location = $3, startdate = $4, enddate = $5, description = $6 WHERE id = $7",
    [companyname, jobtitle, location, startdate, enddate, description, id],
    (error: any, results: any) => {
      if (error) {
        res
          .status(500)
          .json({ error: `Updating the record for id ${id} failed!` });
      } else {
        res
          .status(200)
          .json({ message: `Work experience with id ${id} updated` });
      }
    }
  );
});

app.delete("/delete/:id", (req: any, res: any) => {
  const id = req.params.id;

  if (!/^\d+$/.test(id)) {
    res.status(401).json({ message: "ID (integer) is required" });
    return;
  }

  // Skicka en SQL-förfrågan till databasen för att ta bort en rad med ett visst ID
  pool.query(
    "DELETE FROM workexperience WHERE id = $1",
    [id],
    (error: any, results: any) => {
      if (error) {
        res.status(500).json({ error: "Request failed!" });
      } else {
        res
          .status(200)
          .json({ message: `workexperience with id ${id} deleted` });
      }
    }
  );
});

app.listen(port, () => {
  createTableIfNotExists();
  console.log("Server is running on port: " + port);
});

// Route för "Index" sidan
app.get("/", (req: any, res: any) => {
  res.render("index"); // En infosida om hur API-grejerna fungerar
});
