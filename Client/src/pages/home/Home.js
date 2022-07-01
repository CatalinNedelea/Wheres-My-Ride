import React, { useState, useEffect, useRef } from "react";
import axios from "../../axios/axios";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import { parseLatitude, parseLongitude } from "../../helpers/DDMtoDD";
import {
  Frame,
  Utility,
  MapFrame,
  Center,
  Row,
  Column,
  Input,
  ButtonContainer,
  Paragraph,
} from "./Home.style";
import useEffectOnce from "../../hooks/useEffectOnce";
import busP from "../../environment/assets/bus.png";
import tramP from "../../environment/assets/tram.png";
import trolleyP from "../../environment/assets/trolley.png";

const libraries = ["places"];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 45.7573647,
  lng: 21.2297963,
};

export default function Home() {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries,
  // });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `AIzaSyCf_XSFv4rJgBX9nXRczGe0WsRxD7dmxpw`,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [userLocation, setUserLocation] = React.useState();
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [data, setData] = useState([]);
  const google = window.google;

  //Reference to user input
  const originRef = useRef();
  const destinationRef = useRef();

  async function calculateRoute() {
    if (destinationRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const results = await directionsService.route({
      origin: originRef.current.value || {
        lat: userLocation.lat,
        lng: userLocation.lng,
      },
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.TRANSIT,
    });
    // console.log(results.routes[0].legs[0].steps);
    console.log(results);
    // console.log(results.routes[0].legs[0].steps[1].transit.line.short_name);
    // console.log(results.routes[0].legs[0].steps[1].transit.line);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setData(results.routes[0].legs[0].steps);
  }
  //Functia de directions de la vehicle la statie

  // useEffect(() => {
  //   async function Alakazam() {
  //     if (data.length) {
  //       let found = false;
  //       data.map((d) => {
  //         if (d.transit && !found) {
  //           axios
  //             .post("/vehicles/vehicleByName/" + d.transit.line.short_name)
  //             .then((response) => {
  //               response.data.vehicles.map(async (vehicle) => {
  //                 const directionsService = new google.maps.DirectionsService();
  //                 console.log(d.transit.departure_stop.name);
  //                 const results = await directionsService.route({
  //                   origin: {
  //                     lat: 45.783244,
  //                     lng: 21.219244,
  //                   },
  //                   destination: d.transit.departure_stop.name,
  //                   travelMode: google.maps.TravelMode.TRANSIT,
  //                 });
  //                 console.log(results);
  //               });
  //             });
  //           found = true;
  //         }
  //       });
  //     }
  //   }
  //   Alakazam();
  // }, [data]);

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

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

  useEffect(() => {
    if (vehicles.length) {
      vehicles.map((vehicle) => {
        const check = markers.some((el) => el.id === vehicle._id);
        if (!check) {
          setMarkers((current) => [
            ...current,
            {
              lat: parseLatitude(vehicle.currentLocation.latitude),
              lng: parseLongitude(vehicle.currentLocation.longitude),
              time: new Date(),
              id: vehicle._id,
              type: vehicle.type,
            },
          ]);
        }
      });
    }
  }, [vehicles]);

  function getUserLocation(pos) {
    const crd = pos.coords;
    setUserLocation({
      lat: crd.latitude,
      lng: crd.longitude,
      time: new Date(),
    });
  }

  function getUserLocationError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffectOnce(() => {
    navigator.geolocation.getCurrentPosition(
      getUserLocation,
      getUserLocationError
    );
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(
    (map) => {
      mapRef.current = map;
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      const directionsService = new window.google.maps.DirectionsService();
      directionsRenderer.setMap(map);

      userLocation &&
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    },
    [userLocation]
  );

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    if (destinationRef.current.value === "") {
      return;
    }

    directionsService
      .route({
        origin: { lat: userLocation.lat, lng: userLocation.lng },
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.TRANSIT,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to "));
  }

  return (
    <Frame>
      <Center>
        <Utility>
          <Column>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
            </Autocomplete>
            <div>
              <ButtonContainer type="submit" onClick={calculateRoute}>
                Calculate Route
              </ButtonContainer>
              <ButtonContainer
                className="locate"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                      });
                    },
                    () => null
                  );
                }}
              >
                Show Me{" "}
              </ButtonContainer>
            </div>
          </Column>
          <Row>
            <Paragraph>Distance: {distance} </Paragraph>
            <Paragraph>Duration: {duration} </Paragraph>
          </Row>
        </Utility>
      </Center>

      <MapFrame>
        <GoogleMap
          id="map"
          mapContainerStyle={{ height: "95vh", width: "95vw" }}
          zoom={8}
          center={center}
          options={options}
          onLoad={onMapLoad}
          ref={mapRef}
        >
          {userLocation && (
            <Marker
              key={`${userLocation.lat}-${userLocation.lng}`}
              position={{
                lat: userLocation.lat,
                lng: userLocation.lng,
              }}
            />
          )}

          {/* <VehicleImage
              src={
                vehicle.type === "Bus"
                  ? busP
                  : vehicle.type === "Tram"
                  ? tramP
                  : trolleyP
              }
              alt="VehicleType"
            /> */}

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url:
                  marker.type === "Bus"
                    ? busP
                    : marker.type === "Tram"
                    ? tramP
                    : trolleyP,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </MapFrame>
    </Frame>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    ></button>
  );
}
