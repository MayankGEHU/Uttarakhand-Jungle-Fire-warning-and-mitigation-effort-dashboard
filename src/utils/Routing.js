import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/FireMap/NavBar";
import FireMap from "../components/FireMap/FireMap";
// import WeatherDashboard from "../components/WeatherForecast/WeatherDashboard";
import WeatherApp from "../components/Forcaset/WeatherApp";
function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <FireMap />
            <WeatherApp city="Uttarakhand" country="IN" />
          </>
        }
      />
    </Routes>
  );
}

export default Routing;
