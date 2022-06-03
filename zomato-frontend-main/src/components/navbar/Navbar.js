import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { signout } from "../../redux/actions/userAction";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
function Navbar() {
  const dispatch = useDispatch();
  const cartss = useSelector((state) => state.cart);
  const { cart } = cartss;

  const userSignin = useSelector((state) => state.users);
  const { users } = userSignin;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <div className="navbar-container">
      <div className="logo">
        <Link to={"/"}>
          <img
            src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-restaurant-logo-design-vector-template-png-image_5441058.jpg"
            alt=""
            className="logoimg"
          />
        </Link>
      </div>
      <div className="navbar-links">
        <ul className="list">
          <Link to={"/"} className="link">
            <li className="listitems">Home</li>
          </Link>
          <Link to={"/cartDetails"} className="link">
            <li
              className="listitems"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Cart
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Badge badgeContent={cart && cart.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </span>
            </li>
          </Link>
        </ul>
        {users ? (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {users.username}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <Link to={"/orderhistory"} className="link">
                <MenuItem onClick={handleClose}>My Orders</MenuItem>
              </Link>
              <Link to={"/"} className="link">
                <MenuItem onClick={handleClose}>
                  <button onClick={signoutHandler}>SignOut</button>
                </MenuItem>
              </Link>
            </Menu>
          </div>
        ) : (
          <Link to="/signin" className="link">
            <button style={{ padding: "10px", backgroundColor: "transparent" }}>
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
