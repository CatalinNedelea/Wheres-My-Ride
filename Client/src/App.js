import React from "react";
import { Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "./components/header/Header";
import Vehicles from "./pages/vehicles/Vehicles";
import { VehicleDetails } from "./pages/vehicleDetails/VehicleDetails";
import Home from "./pages/home/Home";

function App() {
  const hist = createBrowserHistory();
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/vehicles" element={<Vehicles />} />
        <Route exact path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/favorites" />
        <Route path="/about" />
      </Routes>
    </>
  );
}

export default App;
