import React, { useState } from "react";
import "./home.css";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import Quickitems from "./Quickitems";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
function Home({ loc, search, data }) {
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setItems(e.target.value);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="home">
      <div className="slick">
        <Carousel
          className="slider"
          autoPlay={true}
          animation="fade"
          indicators={false}
          // navButtonsAlwaysVisible={true}
          cycleNavigation={true}
          StylesProvider
          navButtonsProps={{
            style: {
              color: "white",
              backgroundColor: "transparent",
              borderRadius: 60,
              margin: 0,
              width: 100,
            },
          }}
        >
          {loc.map((image) => (
            <img src={image.image} key={image._id} className="bannerimg" />
          ))}
        </Carousel>
      </div>
      <div className="search">
        <img
          src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-restaurant-logo-design-vector-template-png-image_5441058.jpg"
          alt=""
          className="logoheading"
        />
        <div className="heading">Find the best restaurants, cafes, bars</div>
        <div className="selectandsearch">
          <select
            className="locationDropdown"
            id="select"
            defaultValue={0}
            onChange={handleClick}
          >
            <option value="0" disabled>
              Select
            </option>
            {loc.map((item) => {
              return (
                <option
                  value={item.name}
                  key={item.name}
                >{`${item.name}, ${item.city}`}</option>
                //{" "}
              );
            })}
          </select>
          <div className="search">
            <div className="searchInputs">
              <input
                type="text"
                placeholder="Search for restaurant items"
                value={wordEntered}
                onChange={handleFilter}
              />
              <div className="searchIcon">
                {filteredData.length === 0 ? (
                  <SearchIcon />
                ) : (
                  <CloseIcon id="clearBtn" onClick={clearInput} />
                )}
              </div>
            </div>
            {filteredData.length != 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                  return (
                    <a
                      className="dataItem"
                      href={`http://localhost:3000/items?restaurent=${value.name}`}
                      target="_self"
                    >
                      <p>{value.name} </p>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Quickitems search={search} location={items} />
    </div>
  );
}

export default Home;
