const mongoose = require("mongoose");

const RestaurentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  city_id: {
    type: String,
  },
  location_id: {
    type: Number,
  },
  location_name: {
    type: String,
  },
  min_price: {
    type: Number,
  },
  contact_number: {
    type: Number,
  },
  cuisine_name: {
    type: String,
  },
  mealtype_id: {
    type: Number,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
  },
  rating_text: {
    type: String,
  },
  meal_type: {
    type: String,
  },
});

const Restaurent = mongoose.model("Restaurent", RestaurentSchema);
module.exports = Restaurent;
