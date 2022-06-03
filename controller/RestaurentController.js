const Restaurent = require("../models/RestaurentModel");

exports.createRestuarent = (req, res, next) => {
  const restaurent = new Restaurent({
    name: req.body.name,
    city: req.body.city,
    city_id: req.body.city_id,
    location_id: req.body.location_id,
    location_name: req.body.location_name,
    min_price: req.body.min_price,
    contact_number: req.body.contact_number,
    cuisine_name: req.body.cuisine_name,
    mealtype_id: req.body.mealtype_id,
    image: req.body.image,
    rating: req.body.rating,
    rating_text: req.body.rating_text,
    meal_type: req.body.meal_type,
  });
  restaurent
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getRestaurent = (req, res, next) => {
  const { resId } = req.params;
  Restaurent.findById(resId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

exports.getAllRestaurentBylocId = (req, res, next) => {
  const { location_id } = req.params;

  Restaurent.find({ location_id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

exports.getAllRestaurent = async (req, res, next) => {
  const qCategory = req.query.location_name && req.query.meal_type;

  try {
    let products;

    if (qCategory) {
      products = await Restaurent.find({
        location_name: {
          $in: [qCategory],
        },
        meal_type: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Restaurent.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.allRestaurent = (req, res, next) => {
  Restaurent.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
