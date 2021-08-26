require('dotenv/config');
const database = require('./database');
const app = require('./app');

const { PORT } = process.env;

database();

app.listen(PORT, () => console.log(`server running`));
