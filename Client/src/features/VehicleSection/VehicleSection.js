import React from "react";
import {
  CardBox,
  Icon,
  VehicleImage,
  MainWrapper,
  Link,
  Location,
} from "./VehicleSection.style";
import busP from "../../environment/assets/bus.png";
import tramP from "../../environment/assets/tram.png";
import trolleyP from "../../environment/assets/trolley.png";
import { parseLatitude, parseLongitude } from "../../helpers/DDMtoDD";
import axios from "../../axios/axios";
import { useState, useEffect } from "react";

export const VehicleSection = (props) => {
  const { vehicle } = props;
  const [location, setLocation] = useState("");

  // const reverseGeocode = await axios.get(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${parseLatitude(vehicle.currentLocation.latitude)},${parseLongitude(vehicle.currentLocation.longitude)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  //   );

  useEffect(() => {
    if (vehicle) getCoordsForAddress();
  }, [vehicle]);

  async function getCoordsForAddress() {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${parseLatitude(
        vehicle.currentLocation.latitude
      )},${parseLongitude(vehicle.currentLocation.longitude)}&key=
        AIzaSyCf_XSFv4rJgBX9nXRczGe0WsRxD7dmxpw`
    );

    const data = response.data;
    // console.log(data);
    setLocation(data.results[0].formatted_address);
  }

  return (
    <Link to={`/vehicles/${vehicle._id}`}>
      <MainWrapper>
        <CardBox>
          <Icon>
            <VehicleImage
              src={
                vehicle.type === "Bus"
                  ? busP
                  : vehicle.type === "Tram"
                  ? tramP
                  : trolleyP
              }
              alt="VehicleType"
            />
          </Icon>
          <Icon>{vehicle.name}</Icon>
        </CardBox>
        <CardBox>
          <Location>{location}</Location>
        </CardBox>
      </MainWrapper>
    </Link>
  );
};
