const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Password route (you can expand this later for security)
let correctPassword = "yourpassword";

// Protect routes
app.use((req, res, next) => {
    if (!req.query.password || req.query.password !== correctPassword) {
        return res.redirect('/login.html');  // Redirect to login if no password or wrong password
    }
    next();
});

// Show and season data
app.get('/data/shows.json', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('./data/shows.json', 'utf8')));
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
