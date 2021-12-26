const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 8000;
// json parser
app.use(express.json());

// routes
app.use('/api/v1/auth', require('./routes/auth'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});