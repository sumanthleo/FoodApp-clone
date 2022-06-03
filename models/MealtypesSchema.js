const mongoose = require("mongoose");

const Mealtypes = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  meal_type: {
    type: Number,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
});
const MealtypesModel = mongoose.model("Mealtypes", Mealtypes);
module.exports = MealtypesModel;
