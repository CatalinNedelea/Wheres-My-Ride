import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";

export const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({});
  console.log(vehicle);
  useEffect(() => {
    axios
      .post("/vehicles/" + id)
      .then((response) => setVehicle(response.data.vehicle));
  }, [id]);

  return (
    <div>
      <div>Name: {vehicle.name}</div>
      <div>Vehicle Type: {vehicle.type}</div>
      <div>Vehicle Number Plate: {vehicle.numberPlate}</div>
      <div>Description: {vehicle.description}</div>
    </div>
  );
};
