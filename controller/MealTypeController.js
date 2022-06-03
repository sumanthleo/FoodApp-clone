const MealtypesModel = require("../models/MealtypesSchema");

exports.createMealtype = async (req, res) => {
  const mealtype = new MealtypesModel({
    name: req.body.name,
    meal_type: req.body.meal_type,
    content: req.body.content,
    image: req.body.image,
  });
  await mealtype.save((err, mealtype) => {
    if (err) {
      res.send(err);
    }
    res.json(mealtype);
  });
};
exports.getMealtypes = async (req, res) => {
  try {
    const getmealss = await MealtypesModel.find();
    res.status(200).json(getmealss);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
