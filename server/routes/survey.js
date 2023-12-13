const express = require("express");
const { Survey } = require("../model/survey");
const route = express.Router();

route.post("/new", async (req, res) => {
  const { phone } = req.body;

  try {
    const surveyExist = await Survey.findOne({ phone: phone });
    if (surveyExist) {
      return res.status(400).json({ message: "Survey already exist" });
    }
    const newSurvey = await Survey.create(req.body);
    res.status(201).json({ newSurvey });
  } catch (err) {
    console.log(err);
  }
});

route.get("/all", async (req, res) => {
  try {
    const surveys = await Survey.find({});
    if (surveys.length < 1) {
      return res.status(404).json({ message: "No Surveys found" });
    }
    return res.status(200).json({ surveys });
  } catch (err) {
    console.log(err);
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const survey = await Survey.findOne({ _id: id });
    if (survey) {
      return res.status(200).json({ survey });
    }
    return res.status(404).json({ message: "Not survey Found" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
