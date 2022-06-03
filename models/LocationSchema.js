const mongoose = require("mongoose");

const Locations = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location_id: {
    type: Number,
  },
  city_id: {
    type: Number,
  },
  country_name: {
    type: String,
  },
  bestINCity: {
    type: String,
  },
});

const LocationSchema = mongoose.model("location", Locations);
module.exports = LocationSchema;
