const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// for database connection
require("./database/connection");
// for parsing req to json
// const bodyParser = require("body-parser");

// for routing
const userRoutes = require("./routes/userRoute");
const notesRoutes = require("./routes/notesRoute");

// route middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", notesRoutes);

// for the localhost port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`iNotebook has started at port ${port}`);
});
