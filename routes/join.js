const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

router.get("/join", (req, res) => {
  res.render("../views/pages/join");
});
router.post("/join", (req, res) => {
  const { firstName, lastName, email, party, fanaticism } = req.body;
  const subscriber = new Subscriber({
    firstName,
    lastName,
    email,
    party,
    fanaticism,
  });
  subscriber.save();
  req.flash("success", "We're disappointed in you!");
  console.log(subscriber);
  res.redirect("/");
});

module.exports = router;
