const express = require('express');
const path = require('path');
const morgan = require('morgan'); // For logging requests
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for logging
app.use(morgan('combined'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler: for any request that doesn't match one above, send back index.html.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
        if (err) {
            res.status(err.status).end();
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});