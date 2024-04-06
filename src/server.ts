const fs = require('fs');
const path = require('path');

function createTableIfNotExists() {
    const createTableScriptPath = path.join(__dirname, 'create_table.sql');
    const createTableScript = fs.readFileSync(createTableScriptPath, 'utf8');

    pool.query(createTableScript, (error, results) => {
        if (error) {
            console.error('Error creating table:', error);
        } else {
            console.log('Table successfully created! (or already existing)');
        }
    });
}


require('dotenv').config(); // Detta läser min .env-fil och gör variablerna tillgängliga

const { Pool } = require('pg'); // Använder pg-paketet för att skapa en databasklient
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Använder DATABASE_URL från min .env
  ssl: {
    rejectUnauthorized: false // Detta behövs för att ansluta till Heroku Postgres säkert
  }
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs"); // Ange EJS som vy-motorn
app.use(express.static("public")); // Ange mapp för statiska filer
app.use(express.urlencoded({ extended: true })); // Middleware för att tolka URL

app.use(express.json());
app.use(cors());


app.get('/get', (req, res) => {
    pool.query('SELECT id, companyname, jobtitle, location, startdate, enddate, description FROM workexperience', (error, results) => {
        if (error) {
            // Skicka ett felmeddelande om något går fel med databasförfrågan
            res.status(500).json({ error: "Database error" });
        } else {
            // Skicka databasresultaten som JSON om allt går bra
            res.status(200).json(results.rows);
        }
    });
});

app.post('/post', (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    // Skicka en SQL-förfrågan till databasen för att infoga en ny rad
    pool.query('INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES ($1, $2, $3, $4, $5, $6)', 
        [companyname, jobtitle, location, startdate, enddate, description], 
        (error, results) => {
            if (error) {
                res.status(500).json({ error: "Request failed!" });
            } else {
                res.status(201).json({ message: "workexperience added successfully" });
            }
        }
    );
});

app.put('/put/:id', (req, res) => {
    const id = req.params.id;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    // Skicka en SQL-förfrågan till databasen för att uppdatera en rad med ett visst ID
    pool.query('UPDATE workexperience SET companyname = $1, jobtitle = $2, location = $3, startdate = $4, enddate = $5, description = $6 WHERE id = $7', 
        [companyname, jobtitle, location, startdate, enddate, description, id], 
        (error, results) => {
            if (error) {
                res.status(500).json({ error: "Request failed!" });
            } else {
                res.status(200).json({ message: `workexperience with id ${id} updated` });
            }
        }
    );
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id; 

    // Skicka en SQL-förfrågan till databasen för att ta bort en rad med ett visst ID
    pool.query('DELETE FROM workexperience WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Request failed!" });
        } else {
            res.status(200).json({ message: `workexperience with id ${id} deleted` });
        }
    });
});

app.listen(port, () => {
    createTableIfNotExists();
    console.log('Server is running on port: ' + port);
});

// Route för "Index" sidan
app.get("/", (req, res) => {
    res.render("index"); // En infosida om hur API-grejerna fungerar
});


