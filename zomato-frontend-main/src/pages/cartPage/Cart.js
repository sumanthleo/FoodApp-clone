import React, { useEffect, useState } from "react";
import "./cart.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../../redux/actions/cartAction";
import { Link, useNavigate, useLocation } from "react-router-dom";
function Cart() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const restaurent = searchParams.get("restaurent");

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        restaurent && `/orders?restaurent=${restaurent}`
      );
      setItems(response.data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    restaurent &&
      setFilteredProducts(
        items.filter((item) => item.restaurant_name === restaurent)
      );
  }, [items, restaurent]);

  return (
    <div className="cart_container">
      <div className="cart_title" style={{ textAlign: "center" }}>
        <h1>ITEMS IN :{restaurent} </h1>
      </div>

      <div>
        <Link to={"/cartDetails"}>
          <button
            className="cartbtn"
            style={{ float: "right", marginRight: "10%" }}
          >
            GO TO CART
          </button>
        </Link>
      </div>
      <div className="cartmainItems">
        {/* LEFTcontainer */}

        <div className="mainleft" style={{ width: "80%" }}>
          {filteredProducts.map((item) => (
            <div className="cartleft" key={item._id}>
              <div className="innerleft">
                <img src={item.image} alt="" className="cartImage" />
              </div>
              <div className="innerright">
                <div
                  className="producttitle"
                  style={{
                    marginTop: "15px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {item.item_name}
                </div>
                <div className="productID" style={{ marginTop: "5px" }}>
                  {item.item_description}
                </div>
                <div
                  className="btnsandcolor"
                  style={{ display: "flex", marginTop: "35px" }}
                >
                  <div className="colorandsize_btns">
                    {item.ingredients.map((i) => (
                      <p className="color" key={i.length}>
                        Ingredients : {i}
                      </p>
                    ))}
                  </div>
                  {/* <div className="quantity_btns">
                    <button
                      className="cartbtns"
                      // onClick={() => decrement(item._id)}
                    >
                      -
                    </button>
                    <span className="cartText">{item.quantity}</span>
                    <button
                      className="cartbtns"
                      // onClick={() => increment(item._id)}
                    >
                      +
                    </button>
                  </div> */}
                </div>
                {/* <div
                  className="pricetag"
                  style={{ fontWeight: 700, marginLeft: "20px" }}
                >
                  total: {item.item_price * item.quantity}/-{" "}
                </div>  */}
                <button
                  className="addtoacartbtn"
                  onClick={() => dispatch(addToCart(item))}
                >
                  ADD TO CART
                </button>
                <div className="pricetag" style={{ marginTop: "10px" }}>
                  Item Price: {item.price}/-{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* RIGHTcontainer */}

        {/*  */}
      </div>
    </div>
  );
}

export default Cart;
