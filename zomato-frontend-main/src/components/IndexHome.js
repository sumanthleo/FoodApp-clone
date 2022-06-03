import React, { useEffect, useState } from "react";
import Home from "./home/Home";
import axios from "axios";

function IndexHome() {
  const [location, setLocation] = useState([]);
  const [quicksearch, setQuicksearch] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const locations = await axios.get(`/locations`);
      const quicksearchs = await axios.get(`/mealtype`);
      const restaruent = await axios.get(`/allrestaurent`);

      setLocation(locations.data);
      setQuicksearch(quicksearchs.data);
      setData(restaruent.data);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <Home loc={location} search={quicksearch} data={data} />
    </div>
  );
}

export default IndexHome;
