require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database running");
    })
    .catch((err) => {
      console.log(err);
    });
};
mongoose.set("strictQuery", true);

module.exports = dbConnect;
