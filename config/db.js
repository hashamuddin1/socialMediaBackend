//DATABASE CONNECTION
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((e) => {
    console.log(e);
  });
