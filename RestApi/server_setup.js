const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();//load enviroment variables.
//Import Routes
const dataRouts  = require('./dataRoutes');
const middleware = require('./middleware');

//Middleware
app.use(bodyParser.json());
app.use(middleware.requestLogger);

//Routes
app.use('/data.json', dataRouts);

//server setup
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

