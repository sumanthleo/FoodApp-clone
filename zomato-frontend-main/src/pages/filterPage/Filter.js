import React, { useEffect, useState } from "react";
import "./filter.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Products from "./Products";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
function Filter(props) {
  const navigate = useNavigate();
  const [sort, setSort] = useState({});
  const [filterss, setFilterss] = useState([]);
  const [radio, setRadio] = useState({});
  const [locate, setLocate] = useState([]);
  const [items, setItems] = useState("");
  const [cuisine, setCuisine] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const meal_typess = searchParams.get("meal_type");
  const locationss = searchParams.get("location_name");

  useEffect(() => {
    const fetchdata = async () => {
      const locations = await axios.get(`/locations`);
      const searchLocation = await axios.get(
        `/restaurents?meal_type=${meal_typess}&location=${items}`
      );

      setLocate(locations.data);
      setFilterss(searchLocation.data);
    };
    fetchdata();
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = locate.filter((value) => {
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
    <div className="full-filter">
      <div className="header-text">
        {meal_typess} Places in your {locationss}
      </div>
      <div className="filtercontainer">
        <div>
          <div className="Rectangle">
            <strong className="filter">Filters</strong>
            <form action="" className="formssss">
              <div className="cuisine">Cuisine:</div>
              <div className="checkboxs">
                <select
                  className="cuisines"
                  name="cuisines"
                  id="cuisines"
                  defaultValue={0}
                  onChange={(e) => setCuisine(e.target.value)}
                >
                  <option value="0" disabled>
                    Cuisine:
                  </option>
                  <option>North Indian</option>
                  <option>South Indian</option>
                  <option>Italian</option>
                  <option>Chinese</option>
                </select>
              </div>
              <div className="cost-for-two">Cost:</div>
              <select
                className="prices"
                name="price"
                id="colorandSize"
                defaultValue={0}
                onChange={(e) => setRadio(e.target.value)}
              >
                <option value="0" disabled>
                  prices:
                </option>
                <option>lessthan 500</option>
                <option>500 to 1000</option>
                <option>1000 to 2000</option>
                <option>2000 above</option>
              </select>
              <div className="sort">Sort</div>

              <select
                className="sorts"
                name="sort"
                id="colorandSize"
                defaultValue={0}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="0" disabled>
                  Sort:
                </option>
                <option>Low to High</option>
                <option>High to Low</option>
              </select>
              <br />
            </form>
          </div>
        </div>
        <div className="Main_container">
          <Products
            location={locationss}
            meal_type={meal_typess}
            sort={sort}
            filter={filterss}
            radio={radio}
            cuisine={cuisine}
            items={items}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
