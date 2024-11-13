import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/FireMap/NavBar";
import FireMap from "../components/FireMap/FireMap";
import WeatherDashboard from "../components/WeatherForecast/WeatherDashboard";
function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <FireMap />
            <WeatherDashboard city="Uttarakhand" country="IN" />
          </>
        }
      />
    </Routes>
  );
}

export default Routing;
