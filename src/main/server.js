require("dotenv").config();

const app = require("./config/app");

const { PORT, NODE_ENV } = process.env;

app.listen(PORT, () => {
 console.log(`\nListening port ${PORT}, running on ${NODE_ENV} mode`);
})