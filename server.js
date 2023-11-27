const express = require('express');
const cors = require('cors');

// Create an instance of Express
const app = express();
const port = 3000; // Set the port for the server to listen on

// Parse JSON request bodies
app.use(express.json());

// Enable CORS for all domains
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Enable CORS for all domains
app.use(cors());

// Define a route for the root URL '/'
app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello, world!'
  }); // Send a response to the client
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
