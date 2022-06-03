const mongoose = require("mongoose");

const Orders = new mongoose.Schema({
  placedBy: {
    type: String,
    // required: true,
  },
  placedByUserId: {
    type: Number,
    // required: true,
  },
  placedOn: {
    type: String,
    // required: true,
  },
  items: {
    type: Array,
    // required: true,
  },
  restaurant_name: {
    type: String,
  },
  image: {
    type: String,
  },

  item_description: {
    type: String,
  },
  item_name: {
    type: String,
  },
  price: {
    type: Number,
  },
  ingredients: {
    type: Array,
  },
  id: {
    type: String,
  },
});

const OrderSchema = mongoose.model("order", Orders);
module.exports = OrderSchema;
