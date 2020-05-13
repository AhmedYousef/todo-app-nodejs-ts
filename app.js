const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 81;
const app = express();

//Injecting Middlewares
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));