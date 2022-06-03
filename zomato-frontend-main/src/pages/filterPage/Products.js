import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./filter.css";
import SingleItem from "./SingleItem";
function Products({
  location,
  meal_type,
  sort,
  filter,
  radio,
  cuisine,
  items,
}) {
  const [filters, setFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  useEffect(() => {
    const getFilter = async () => {
      const response = await axios.get(
        location
          ? `/restaurents?meal_type=${meal_type}&location=${location}`
          : `/restaurents?meal_type=${meal_type}&location=${items}`
      );
      setFilters(response.data);
    };
    getFilter();
  }, [location, meal_type]);

  useEffect(() => {
    location &&
      meal_type &&
      sort &&
      cuisine &&
      radio &&
      setFilteredProducts(
        filters.filter(
          (item) =>
            (item.location_name === location && item.meal_type === meal_type) ||
            (item.cuisine_name === cuisine &&
              item.location_name === location &&
              item.meal_type === meal_type) ||
            (item.cuisine_name === cuisine && item.min_price === radio)
        )
      );
  }, [filters, location, meal_type, sort, radio, cuisine]);

  //cuisine

  useEffect(() => {
    if (cuisine.length == 0) {
      setFilteredProducts((prevs) =>
        [...prevs].filter(
          (item) =>
            item.cuisine_name === "North Indian" ||
            item.cuisine_name === "South Indian" ||
            item.cuisine_name === "Chinese" ||
            item.cuisine_name === "Italian"
        )
      );
    } else if (cuisine === "North Indian") {
      setFilteredProducts((prevs) =>
        [...prevs].filter((item) => item.cuisine_name === "North Indian")
      );
    } else if (cuisine === "South Indian") {
      setFilteredProducts((prevs) =>
        [...prevs].filter((item) => item.cuisine_name === "South Indian")
      );
    } else if (cuisine === "Chinese") {
      setFilteredProducts((prevs) =>
        [...prevs].filter((item) => item.cuisine_name === "Chinese")
      );
    } else if (cuisine === "Italian") {
      setFilteredProducts((prevs) =>
        [...prevs].filter((item) => item.cuisine_name === "Italian")
      );
    } else {
      return (
        <div className="errorTag">
          <h1 style={{ textAlign: "center", marginTop: "10%", color: "red" }}>
            No Restaurants Found
          </h1>
        </div>
      );
    }
  }, [cuisine, filters]);

  //prices
  useEffect(() => {
    if (radio === "500 to 1000") {
      setFilteredProducts((prev) =>
        [...prev].filter(
          (item) => item.min_price >= 500 && item.min_price <= 1000
        )
      );
    } else if (radio === "1000 to 2000") {
      setFilteredProducts((prev) =>
        [...prev].filter(
          (item) => item.min_price >= 1000 && item.min_price <= 2000
        )
      );
    } else if (radio === "2000 above") {
      setFilteredProducts((prev) =>
        [...prev].filter(
          (item) => item.min_price >= 2000 && item.min_price <= 5000
        )
      );
    } else if (radio === "lessthan 500") {
      setFilteredProducts((prev) =>
        [...prev].filter((item) => item.min_price <= 500)
      );
    } else {
      return (
        <div className="nullTag">
          <h1>No Items Found</h1>
        </div>
      );
    }
  }, [radio]);

  //sorting
  useEffect(() => {
    if (sort === "Low to High") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.min_price - b.min_price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.min_price - a.min_price)
      );
    }
  }, [sort]);

  if (location.length == 0) {
    return (
      <div className="error">
        <h1 style={{ textAlign: "center", marginTop: "10%", color: "red" }}>
          Please select a location{" "}
          <span>
            <Link to={"/"}>Go Back</Link>
          </span>
        </h1>
      </div>
    );
  }
  if (filters.length == 0) {
    return (
      <div className="error">
        <h1
          style={{
            textAlign: "center",
            marginTop: "10%",
            position: "absolute",
          }}
        >
          No Restaurants Found
        </h1>
      </div>
    );
  }

  // pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      {(location && meal_type) || cuisine
        ? filteredProducts.map((item) => (
            <SingleItem key={item._id} item={item} />
          ))
        : null}
      {/* <SingleItem /> */}
      <div className="listsbtnsss">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
