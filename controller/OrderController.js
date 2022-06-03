const OrderSchema = require("../models/Orders");

exports.createOrder = async (req, res, next) => {
  const order = new OrderSchema({
    placedBy: req.body.placedBy,
    placedByUserId: req.body.placedByUserId,
    placedOn: req.body.placedOn,
    items: req.body.items,
    image: req.body.image,
    restaurant_name: req.body.restaurant_name,
    item_description: req.body.item_description,
    item_name: req.body.item_name,
    price: req.body.price,
    ingredients: req.body.ingredients,
    // user: req.user._id,
  });
  order
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getOrderByRes = async (req, res, next) => {
  const { restaurantss } = req.query.restaurent;
  try {
    let order;

    if (restaurantss) {
      order = await OrderSchema.find({
        restaurant_name: {
          $in: [restaurantss],
        },
      });
    } else {
      order = await OrderSchema.find();
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await OrderSchema.findById({ _id: req.params.id });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};
