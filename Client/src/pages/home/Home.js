import React, { useState, useEffect, useRef } from "react";
import axios from "../../axios/axios";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyles from "./mapStyles";
import compass from "../../environment/assets/compass.svg";
import { parseLatitude, parseLongitude } from "../../helpers/DDMtoDD";
import { Frame, Center, Utility, MapFrame } from "./Home.style";

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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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

  function success(pos) {
    const crd = pos.coords;
    setUserLocation({
      lat: crd.latitude,
      lng: crd.longitude,
      time: new Date(),
    });
  }

  function error2(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error2);

  return (
    <Frame>
      <Utility>
        <Locate panTo={panTo} />
        <div>
          <Autocomplete>
            <input type="text" placeholder="Origin" ref={originRef} />
          </Autocomplete>
        </div>
        <div>
          <Autocomplete>
            <input type="text" placeholder="Destination" ref={destinationRef} />
          </Autocomplete>
        </div>

        <div>
          <button type="submit" onClick={calculateRoute}>
            Calculate Route
          </button>
        </div>

        <div>
          <p>Distance: {distance} </p>
          <p>Duration: {duration} </p>
        </div>
      </Utility>

      <MapFrame>
        <GoogleMap
          id="map"
          mapContainerStyle={{ height: "100vh", width: "100vw" }}
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

//Returns your current location
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
    >
      <img src={compass} alt="compass" />
    </button>
  );
}

// function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 43.6532, lng: () => -79.3832 },
//       radius: 100 * 1000,
//     },
//   });

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log("😱 Error: ", error);
//     }
//   };

//   return <div>Tomato</div>;
//   /* <Combobox onSelect={handleSelect}>
//         <ComboboxInput
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Search your location"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox> */
// }
