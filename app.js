const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));


const passwords = [];

const users = [
    { username: 'user', password: 'password' },
];

// Handle POST requests to add a password
app.post('/add', (req, res) => {
    const { site, password } = req.body;
    passwords.push({ site, password });
    res.redirect('/manager.html'); // Redirect to the password manager page
});

// Serve passwords as JSON
app.get('/passwords', (req, res) => {
    res.json(passwords);
});

// Handle POST requests to login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.redirect('/manager.html'); // Redirect to the password manager page
    } else {
        res.send('Login failed. Please check your username and password.');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//node app.js