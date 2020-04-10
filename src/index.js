require("dotenv").config();

const express = require("express");

const { PORT, NODE_ENV } = process.env;

const app = express();


app.listen(PORT, () => {
 console.log(`Listening port ${PORT}, running on ${NODE_ENV} mode`);
})