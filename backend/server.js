const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require('./middleware/errorMiddleware')

// process.env.PORT   ---- Allows us to access the .env port. If it's not found itll use port 5000
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port ${port}`));
