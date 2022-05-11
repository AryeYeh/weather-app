import React, { useState, useEffect, useMemo } from "react"
import clearDay from "../images/clear-day.png"
import clearNight from "../images/clear-night.png"
import mostlyClearDay from "../images/mostly-clear-day.png"
import mostlyClearNight from "../images/mostly-clear-night.png"
import partlyClearDay from "../images/partly-clear-day.png"
import partlyClearNight from "../images/partly-clear-night.png"
import partlyCloudy from "../images/partly-cloudy.png"
import mostlyCloudy from "../images/mostly-cloudy.png"
import cloudy from "../images/cloudy.png"
import rainy from "../images/rainy.png"
import thunderStorms from "../images/thunderstorms.png"
import foggy from "../images/fog.png"
import snowy from "../images/snow.png"
import { CardMedia } from "@mui/material"


const weatherTypesList = {
  isClear: [1],
  isMostlyClear: [2],
  isPartlyClear: [3],
  isPartlyCloudy: [4],
  isMostlyCloudy: [5, 6],
  isCloudy: [7],
  isRainy: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,],
  isThunderStorms: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isFoggy: [24, 25, 26, 27, 28],
  isSnowy: [23, 37, 42],
}

const weatherIconsList = {
  day: {
    isClear: clearDay,
    isMostlyClear: mostlyClearDay,
    isPartlyClear: partlyClearDay,
    isPartlyCloudy: partlyCloudy,
    isMostlyCloudy: mostlyCloudy,
    isCloudy: cloudy,
    isRainy: rainy,
    isThunderStorms: thunderStorms,
    isFoggy: foggy,
    isSnowy: snowy,
  },
  night: {
    isClear: clearNight,
    isMostlyClear: mostlyClearNight,
    isPartlyClear: partlyClearNight,
    isPartlyCloudy: partlyCloudy,
    isMostlyCloudy: mostlyCloudy,
    isCloudy: cloudy,
    isRainy: rainy,
    isThunderStorms: thunderStorms,
    isFoggy: foggy,
    isSnowy: snowy,
  }
}

const weatherCodeToTypeConverter = (weatherCode) => {
  const [weatherType] =
    Object.entries(weatherTypesList).find(([weatherType, weatherCodes]) =>
      weatherCodes.includes(Number(weatherCode))) || []
  return weatherType
}

export default function WeatherIcon({ currentWeatherCode, moment }) {
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState("isClear")

  const weatherIconResult = useMemo(() => {
    return weatherCodeToTypeConverter(currentWeatherCode)
  }, [currentWeatherCode])

  useEffect(() => {
    setCurrentWeatherIcon(weatherIconResult)
  }, [weatherIconResult])

  return (
    <div className="drop-shadow-2xl">
      <CardMedia
        component="img"
        src={weatherIconsList[moment][currentWeatherIcon]}
        sx={{ height: 192, width: 192 }}
      />
    </div>
  )
}