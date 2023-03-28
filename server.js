const dotenv = require('dotenv');

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "math-app",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models");

db.sequelize.sync();
app.get("/", (req, res) => {
  res.json({ message: "Server works." });
});

// routes
require("./app/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
