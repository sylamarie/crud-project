const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware to parse incoming JSON requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});
app.use('/', require('./routes')); // existing routes

// Add this line to mount the Swagger docs
app.use('/', require('./routes/swagger')); // Mounts /api-docs endpoint


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node server is running on port ${port}`);
        });
    }
});

app.listen(port, () => {console.log(`Running on port ${port}`)});