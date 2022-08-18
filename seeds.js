const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/political-website");
  console.log("Connection open");
}

const s = new Subscriber({
  firstName: "Chad",
  lastName: "Fresca",
  email: "chad42069@fgw.com",
  party: "scum",
  fanaticism: "aggressive",
});
s.save().then((s) => {
  console.log(s);
});
