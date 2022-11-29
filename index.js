const express = require("express");
const app = express();
require("./start/routes")(app);
require("./start/db")();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
