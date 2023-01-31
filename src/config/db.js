const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/projects23", {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database running");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;
