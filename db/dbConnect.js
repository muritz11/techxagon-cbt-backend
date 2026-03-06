const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("successfully connected to mongoDb atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to mongoDb atlas!");
      console.log(error);
    });
}

module.exports = dbConnect;
