const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();

app.use(cors({
  origin: '*',
  // methods: ["GET", "POST"]
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome" });
// });


app.get("/", (req, res)=>{
  res.json("Welcome to the Lalit's web")
})

require("./app/routes/categories.route")(app);
require("./app/routes/package.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});