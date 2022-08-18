const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    enum: ["scum", "villainy"],
  },
  fanaticism: {
    type: String,
    enum: ["indifferent", "offended", "aggressive", "radicalized"],
  },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
