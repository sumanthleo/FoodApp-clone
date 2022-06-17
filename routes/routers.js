const LocationController = require("../controller/LocationController");
const express = require("express");
const mg = require("mailgun-js");
const {
  createMealtype,
  getMealtypes,
} = require("../controller/MealTypeController");
const {
  createRestuarent,
  getAllRestaurent,
  getRestaurent,
  getAllRestaurentBylocId,
  allRestaurent,
} = require("../controller/RestaurentController");
const {
  createOrder,
  getOrderByRes,
  getOrderById,
} = require("../controller/OrderController");
const { Signup, Login } = require("../controller/userController");
const {
  placeOrder,
  getOrders,
  updateOrderPay,
  orderHistory,
} = require("../controller/PlaceOrder");
const router = express.Router();

router.get("/hi", (req, res) => {
  res.send("Hello World");
});
router.post("/locations", LocationController.CreateLocations);
router.get("/locations", LocationController.getLocations);
router.post("/mealtype", createMealtype);
router.get("/mealtype", getMealtypes);
router.post("/restaurents", createRestuarent);
router.get("/restaurent/:resId", getRestaurent);
router.get("/restaurent/:location_id", getAllRestaurentBylocId);
router.get("/restaurents", getAllRestaurent);
router.get("/allrestaurent", allRestaurent);

router.post("/order", createOrder);
router.get("/orders", getOrderByRes);
router.get("/orders/:id", getOrderById);

router.post("/signup", Signup);
router.post("/signin", Login);

router.post("/placeorder", placeOrder);
router.get("/placeorder/:id", getOrders);

router.get("/placeorder/mine", orderHistory);

router.get("/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
router.put("/placeorder/:id/pay", updateOrderPay);

module.exports = router;
