const express = require("express");
const app = express();
const moongose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Router = require("./router/router");

dotenv.config();

console.log(process.env.DATABASE_CONNECTION_URL,"URL");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

moongose
  .connect(process.env.DATABASE_CONNECTION_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongoDB connected.....");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/", Router);

app.listen(process.env.PORT, function () {
  console.log("listening on port 1000");
});
