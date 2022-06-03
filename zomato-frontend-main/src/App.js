import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Filter from "./pages/filterPage/Filter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer copy/Footer";
import IndexHome from "./components/IndexHome";
import Cart from "./pages/cartPage/Cart";
import CartDetails from "./pages/cartdetails/CartDetails";
import SignIn from "./pages/login/SignIn";
import Register from "./pages/signup/Register";
import ShippingPage from "./pages/shipping/ShippingPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import PlaceOrder from "./pages/placeorder/PlaceOrder";
import OrderPage from "./pages/Order/OrderPage";
import OrderHistory from "./pages/orderHistory/OrderHistory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexHome />} />
        <Route path="/filter/:meal_type" element={<Filter />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/items" element={<Cart />} />
        <Route path="/cartDetails" element={<CartDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
