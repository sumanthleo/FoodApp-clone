import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
} from "./reducers/orderReducer";
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducer";

const initialState = {
  users: {
    users: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : null,
  },
  cart: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

const reducer = combineReducers({
  users: userSigninReducer,
  userRegister: userRegisterReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
