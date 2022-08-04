const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/info", (req, res) => {
  console.log("req for info received");
  res.render("pages/info");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
