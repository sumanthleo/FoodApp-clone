// import Order from "../models/PlaceOrder";
const Order = require("../models/PlaceOrder");
const mailgun = require("../routes/routers");

exports.placeOrder = async (req, res) => {
  try {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      // user: req.body.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateOrderPay = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      res.status(200).json(updatedOrder);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.orderHistory = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
