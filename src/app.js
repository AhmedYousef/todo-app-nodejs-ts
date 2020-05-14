const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();

//Injecting Middlewares
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(csrf({ cookie: true }));

app.use('/todoApp/api', require('./routes/api/todos'));

module.exports = app;