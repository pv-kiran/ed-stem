const express = require("express");
// const { ConnectDB } = require("./db/connect");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173" }));

const surveyRoutes = require("./routes/survey");

app.use("/api/survey", surveyRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/ed-test")
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is up and running");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Server is down");
  });
