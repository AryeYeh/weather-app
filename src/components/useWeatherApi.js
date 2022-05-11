import { useState, useEffect, useCallback } from "react"


const fetchCurrentWeather = (locationName) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-40118D39-85E7-4A23-85AC-86E118F2B355&locationName=${locationName}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      const locationData = data.records.location[0]
      const neededData = ["WDSD", "TEMP", "HUMD"]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, currentElement) => {
          if (neededData.includes(currentElement.elementName)) {
            neededElements[currentElement.elementName] = currentElement.elementValue
          }
          return neededElements
        },
        {}
      )

      return ({
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        humid: weatherElements.HUMD,
      })
    })
    .catch((error) => console.log(error))
}

const fetchWeatherForecast = (cityName) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-40118D39-85E7-4A23-85AC-86E118F2B355&locationName=${cityName}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      const locationData = data.records.location[0]
      const neededData = ["Wx", "PoP"]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, currentElement) => {
          if (neededData.includes(currentElement.elementName)) {
            neededElements[currentElement.elementName] = currentElement.time[0].parameter
          }
          return neededElements
        },
        {}
      )

      return ({
        locationName: locationData.locationName,
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        probabilityOfPrecipitation: weatherElements.PoP.parameterName,
      })
    })
    .catch((error) => console.log(error))
}

export default function useWeatherApi(currentLocation) {
  const { locationName, cityName } = currentLocation
  const [currentWeather, setCurrentWeather] = useState({
    isLoading: true,
    locationName: "",
    description: "",
    temperature: 0,
    windSpeed: 0,
    humid: 0,
    weatherCode: 0,
  })

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeatherData, weatherForecastData] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName),
      ])
      //console.log(fetchCurrentWeather())
      //console.log(fetchWeatherForecast())
      setCurrentWeather({
        ...currentWeatherData,
        ...weatherForecastData,
        isLoading: false,
      })
    }

    setCurrentWeather((prevState) => ({
      ...prevState,
      isLoading: true,
    }))

    fetchingData()
  }, [locationName, cityName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [currentWeather, fetchData]
}