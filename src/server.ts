require('dotenv').config(); // Detta läser min .env-fil och gör variablerna tillgängliga

const { Pool } = require('pg'); // Använder pg-paketet för att skapa en databasklient
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Använder DATABASE_URL från din .env
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

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to my REST API' });
});

app.get('/api/users', (req, res) => {
    res.json({ message: 'GET request to api/users' });
});

app.post('/api/users', (req, res) => {
    res.json({ message: 'POST request to api/users' });
});

app.put('/api/users/:id', (req, res) => {
    res.json({ message: 'PUT request to /users - with id: ' + req.params.id });
});

app.delete('/api/users/:id', (req, res) => {
    res.json({ message: 'DELETE request to /users - with id: ' + req.params.id });
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});


// Route för "Index" sidan, vill mest bara testa att det fungerar, tror inte att jag kommer använda den i detta projekt
app.get("/", (req, res) => {
    res.render("index"); // Rendera "About" sidan
    pool.query('SELECT * FROM exempel_tabell', (error, results) => {
        if (error) {
          throw error;
        }
        console.log(results.rows);
      });
});


app.get('/api/test', (req, res) => {
    pool.query('SELECT * FROM exempel_tabell', (error, results) => {
        if (error) {
            // Skicka ett felmeddelande om något går fel med databasförfrågan
            res.status(500).json({ error: "Det gick inte att hämta data från databasen" });
        } else {
            // Skicka databasresultaten som JSON om allt går bra
            res.status(200).json(results.rows);
        }
    });
});
