import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
import { MainWrapper, Item, Cell, Table, Row } from "./VehicleDetails.style";
import { parseLatitude, parseLongitude } from "../../helpers/DDMtoDD";

export const VehicleDetails = () => {
  const [location, setLocation] = useState("");
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({});
  const [schedule, setSchedule] = useState({});
  const [loadingVehicle, setLoadingVehicle] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  useEffect(() => {
    if (vehicle.scheduleID) {
      axios.get("/schedule/" + vehicle.scheduleID).then((response) => {
        setSchedule(response.data.schedule);
        setLoadingSchedule(true);
      });
    }
    if (vehicle && !vehicle.scheduleID) {
      setLoadingSchedule(true);
    }
  }, [vehicle]);
  // console.log(schedule);

  // console.log("Vehicle stuff", vehicle);
  useEffect(() => {
    axios.post("/vehicles/" + id).then((response) => {
      setVehicle(response.data.vehicle);
      setLoadingVehicle(true);
    });
  }, [id]);

  useEffect(() => {
    if (vehicle) getCoordsForAddress();
  }, [vehicle]);

  async function getCoordsForAddress() {
    if (vehicle && vehicle.currentLocation) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${parseLatitude(
          vehicle.currentLocation.latitude
        )},${parseLongitude(vehicle.currentLocation.longitude)}&key=
        REACT_APP_GOOGLE_MAPS_API_KEY`
      );

      const data = response.data;
      setLocation(data.results[0].formatted_address);
    }
  }
  if (!loadingVehicle || !loadingSchedule) {
    return <p>Loading...</p>;
  }
  return (
    <MainWrapper>
      <Item>Name: {vehicle.name}</Item>
      <Item>Vehicle Type: {vehicle.type}</Item>
      <Item>Vehicle Number Plate: {vehicle.numberPlate}</Item>
      <Item>Current Address: {location}</Item>

      {schedule.stations?.map((station) => (
        <div key={station._id}>
          <p>Station Name: {station.name}</p>
          <Table>
            <tbody>
              <Row>
                <Cell>Working Days</Cell>
                {station.schedule.workingDays?.map((w, index) => (
                  <Cell key={index}>{w}</Cell>
                ))}
              </Row>
              <Row>
                <Cell>Saturday</Cell>
                {station.schedule.saturday?.map((w, index) => (
                  <Cell key={index}>{w}</Cell>
                ))}
              </Row>
              <Row>
                <Cell>Sunday</Cell>
                {station.schedule.sunday?.map((w, index) => (
                  <Cell key={index}>{w}</Cell>
                ))}
              </Row>
            </tbody>
          </Table>
        </div>
      ))}
    </MainWrapper>
  );
};
