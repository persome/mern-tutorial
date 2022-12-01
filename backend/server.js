const express = require("express");
const dotenv = require("dotenv").config();

// process.env.PORT   ---- Allows us to access the .env port. If it's not found itll use port 5000
const port = process.env.PORT || 5000;

const app = express();

app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`));
