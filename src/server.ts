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
});