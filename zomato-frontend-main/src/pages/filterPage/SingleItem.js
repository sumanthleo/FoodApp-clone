import React from "react";
import "./filter.css";
import { Link } from "react-router-dom";
function SingleItem({ item }) {
  return (
    <div className="single-item">
      <div className="square">
        <div className="image-section">
          <div className="image1">
            <img
              src={item.image}
              alt="image-here"
              height="125px"
              width="155px"
              className="imgsss"
            />
          </div>
          <div className="image-text">
            <h1>{item.name}</h1>
            <h6>{item.location_name}</h6>
            <p>Shop 1, Plot D, Samruddhi Complex, {item.contact_number}</p>
          </div>
        </div>
        <hr className="hr-tag" />
        <div className="details">
          <div className="details-headline">
            CUISINES:
            <span className="span-headline1">{item.cuisine_name}</span>
          </div>
          <div className="details-headline">
            COST FOR TWO:
            <span className="span-headline2">{item.min_price}/-</span>
          </div>
          <div className="details-headline">RATINGS : {item.rating}</div>
        </div>
        <Link to={`/items?restaurent=${item.name}`}>
          <button className="placebtn">PLACE ORDER</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleItem;
