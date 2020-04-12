require("dotenv").config();

const app = require("./config/app");

const { PORT, NODE_ENV } = process.env;

const definedPort = PORT || 3000;

app.listen(definedPort, () => {
 console.log(`\nListening port ${definedPort}, running on ${NODE_ENV} mode`);
})