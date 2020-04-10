const express = require('express');
const setupRoutes = require("./routes");

const app = express();

setupRoutes(app);

module.exports = app;