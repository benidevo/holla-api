const express = require('express');
const app = express();
require('dotenv').config();

const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 8000;
// json parser
app.use(express.json());


app.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
});