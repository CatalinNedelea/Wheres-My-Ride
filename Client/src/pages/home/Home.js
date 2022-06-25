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
} from "./Home.style";
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
  const google = window.google;
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  async function calculateRoute() {
    if (destinationRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const results = await directionsService
      .route({
        origin: originRef.current.value || {
          lat: userLocation.lat,
          lng: userLocation.lng,
        },
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.TRANSIT,
      })
   console.log(results.routes[0].legs[0].steps)
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
