const express = require("express");
const app = express();
require("./start/logging")();
require("./start/routes")(app);
require("./start/db")();
require("./services/cache");
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
