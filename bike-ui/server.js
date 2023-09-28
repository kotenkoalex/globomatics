// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();

// Parsers for POST data
app.use(bodyParser.json({ limit: '20mb' })); // Use object with 'limit' property
app.use(bodyParser.urlencoded({ extended: false, limit: '20mb' }));

app.use(cors());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Set up a proxy for API routes to point to a Spring Boot server
app.use('/server', proxy('http://localhost:8080'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 4200; // Use process.env.PORT for dynamic port binding
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on the provided port, on all network interfaces
server.listen(port, () => {
  console.log(`API running on port ${port}`);
});
