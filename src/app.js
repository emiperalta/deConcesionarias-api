const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const createApp = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

createApp(app);

module.exports = app;
