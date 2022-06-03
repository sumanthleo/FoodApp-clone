const LocationSchema = require("../models/LocationSchema");

exports.CreateLocations = async (req, res) => {
  try {
    // const {name , city} = req.body
    const newLocations = new LocationSchema(req.body);
    const location = await newLocations.save();
    res.status(200).json(location);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.getLocations = async (req, res) => {
  try {
    const location = await LocationSchema.find();
    res.status(200).json(location);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
