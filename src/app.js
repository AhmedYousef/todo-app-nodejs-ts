const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Injecting Middlewares
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.use('/todoApp/api', require('./routes/api/todos'));

module.exports = app;