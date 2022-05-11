import React, { useEffect, useState } from "react";
import LocationSettings from "./components/LocationSettings";
import WeatherCard from "./components/WeatherCard";
import useWeatherApi from "./components/useWeatherApi";
import FindLocations from "./components/ConversionTable";

export default function WeatherApp() {
  const storageCityName = localStorage.getItem("cityName")
  const [currentCity, setCurrentCity] = useState(storageCityName || "臺北市")
  const currentLocation = FindLocations(currentCity) || {}
  const [currentWeather, fetchData] = useWeatherApi(currentLocation)
  const [currentPage, setCurrentPage] = useState("WeatherCard")

  useEffect(() => {
    localStorage.setItem("cityName", currentCity)
  }, [currentCity])

  return (
    <div className="flex justify-center items-center bg-gray-600 h-screen w-screen min-h-[600px] min-w-[400px]">
      {currentPage === "WeatherCard" && (
        <WeatherCard
          cityName={currentLocation.cityName}
          currentWeather={currentWeather}
          fetchData={fetchData}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "LocationSettings" && (
        <LocationSettings
          cityName={currentLocation.cityName}
          setCurrentCity={setCurrentCity}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div >
  )
}