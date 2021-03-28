const connectDB = require('./config/db')
const cors = require('cors');
const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
dotenv.config()

// Task routes
const taskRoutes = require('./routes/task.routes');
;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


// enable CORS
app.use(cors());

mongoose.Promise = global.Promise;

// Connecting to the database
connectDB()

// Apply task routes
app.use('/api/tasks', taskRoutes);


// define entry route
app.get('/', (req, res) => {
    const response = {
        message: 'Welcome to my simple todolist application...',
    };

    res.json(response);
});

const port = process.env.PORT || 5000;
// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
