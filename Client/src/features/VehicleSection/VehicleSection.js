import React from "react";
import {
  CardBox,
  Element12,
  VehicleImage,
  MainWrapper,
  Link,
} from "./VehicleSection.style";
import busP from "../../environment/assets/bus.png";
import tramP from "../../environment/assets/tram.png";
import trolleyP from "../../environment/assets/trolley.png";

export const VehicleSection = (props) => {
  const { vehicle } = props;
  // console.log(vehicle, vehicle._id);
  return (
    <Link to={`/vehicles/${vehicle._id}`}>
      <MainWrapper>
        <CardBox>
          <Element12>
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
          </Element12>
          <Element12>{vehicle.name}</Element12>
        </CardBox>
        <CardBox>{vehicle.currentLocation.latitude}</CardBox>
      </MainWrapper>
    </Link>
  );
};
