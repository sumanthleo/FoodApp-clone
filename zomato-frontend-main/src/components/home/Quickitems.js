import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
function Quickitems({ search, location }) {
  return (
    <div className="main-container">
      <div className="itemheading">Quick Searches</div>
      <div className="subheading">Discover restaurants by type of meal</div>
      <div className="item">
        {search.map((items) => {
          return (
            <Link
              to={
                location
                  ? `/filter?meal_type=${items.name}&location_name=${location}`
                  : `/filter?meal_type=${items.name}`
              }
              className="link"
              key={items._id}
            >
              <div className="boxes" key={items._id}>
                <div className="imgcontainer">
                  <img src={items.image} alt="" className="boximage" />
                </div>
                <div className="decs">
                  <div className="imagetitle">{items.name}</div>
                  <div className="imagedesc">{items.content}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Quickitems;
