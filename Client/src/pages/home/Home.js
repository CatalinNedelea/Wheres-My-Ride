import React, { useState, useEffect, useRef } from "react";
import axios from "../../axios/axios";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import { parseLatitude, parseLongitude } from "../../helpers/DDMtoDD";
import { Frame, Utility, MapFrame, Center, Row, Column, Input } from "./Home.style";
import useEffectOnce from "../../hooks/useEffectOnce";

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
  const [selected, setSelected] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState();
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

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
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  // const center = cloneDeep(userLocation);

  return (
    <Frame>
      <Center>
        <Utility>
          <Column>
            <Input>
              <Autocomplete>
                <input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </Input>
            <Input>
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Destination"
                  ref={destinationRef}
                />
              </Autocomplete>
            </Input>
            <div>
              <button type="submit" onClick={calculateRoute}>
                Calculate Route
              </button>
            </div>
          </Column>

          <Row>
            <p>Distance: {distance} </p>
            <p>Duration: {duration} </p>
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

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
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
