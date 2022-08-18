if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const subscriberRoute = require("./routes/join");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");

const dbUrl = process.env.DB_URL;

app.use(
  session({
    secret,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: dbUrl,
      touchAfter: 24 * 3600,
    }),
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

const secret = process.env.SECRET || "nosecret";

const sessionConfig = {
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(express.json());
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB");
}

app.use("/", subscriberRoute);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/info", (req, res) => {
  console.log("req for info received");
  res.render("pages/info");
});

app.post("");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
