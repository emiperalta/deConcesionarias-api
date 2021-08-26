const express = require('express');
const cors = require('cors');

const createApp = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

createApp(app);

module.exports = app;
