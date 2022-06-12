import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { VehicleSection } from "../../features/VehicleSection/VehicleSection";
import { Container } from "./Vehicles.style";

const Vehicles = (props) => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/vehicles")
      .then((response) => {
        setVehicles(response.data.vehicles);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  let Vehicles = <p style={{ textAlign: "center" }}>Something went wrong</p>;

  if (!error && vehicles.length) {
    Vehicles = vehicles.map((vehicle, index) => {
      return <VehicleSection key={index} _id={vehicle._id} vehicle={vehicle} />;
    });
  }

  return <Container>{Vehicles}</Container>;
};

export default Vehicles;
