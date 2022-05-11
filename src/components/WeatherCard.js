import React from "react";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Link,
  CircularProgress,
} from "@mui/material";
import WeatherIcon from "./WeatherIcon";
import windVelocity from "../images/windsock.png";
import probabilityOfPrecipitation from "../images/umbrella.png";
import relativeHumidity from "../images/meter.png";
import moment from "moment";
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';

const dayOrNight = () => {
  const currentHour = moment().format("HH")
  if (currentHour >= 6 && currentHour < 18) return "day"
  if (currentHour < 6 || currentHour >= 18) return "night"
}

export default function WeatherCard(props) {
  const { currentWeather, fetchData, setCurrentPage, cityName } = props

  return (
    <div>
      <Card sx={{
        minWidth: 400,
        minHeight: 640,
        maxHeight: 640,
        backgroundColor: "#1e88e5",
      }}>
        <CardHeader
          action={
            <Stack
              direction="row"
              spacing={2}
              justifyContent="between"
              alignItems="center"
            >
              <IconButton
                onClick={() => setCurrentPage("LocationSettings")}
                sx={{ color: "#e0e0e0" }}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton onClick={fetchData} sx={{ color: "#e0e0e0" }}>
                {currentWeather.isLoading ? <CircularProgress color="inherit" size={18} /> : <RefreshIcon />}
              </IconButton>
            </Stack>
          }
          title={cityName}
          subheader={
            <Typography sx={{ color: "#e0e0e0" }}>
              {moment().format("MMMM Do YYYY, h:mm:ss a")}
            </Typography>
          }
          sx={{ color: "#e0e0e0" }}
        />
        <div className="flex justify-center">
          <WeatherIcon
            currentWeatherCode={currentWeather.weatherCode}
            moment={dayOrNight()}
          />
        </div>
        <CardContent>
          <Typography component="div" sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: 100,
            pl: 5,
            color: "#fafafa",
          }}>
            {Math.round(currentWeather.temperature)}
            <Typography variant="h4" component="span" sx={{
              pt: 3,
            }}>
              °C
            </Typography>
          </Typography>
          <Typography variant="h4" align="center" sx={{ color: "#fafafa" }}>
            {currentWeather.description}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 4, pt: 3, color: "#e0e0e0" }}
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <CardMedia
                component="img"
                src={windVelocity}
                sx={{ height: 48, width: 48 }}
              />
              <Typography>{currentWeather.windSpeed} m/s</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <CardMedia
                component="img"
                src={probabilityOfPrecipitation}
                sx={{ height: 48, width: 48 }}
              />
              <Typography>{currentWeather.probabilityOfPrecipitation} %</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <CardMedia
                component="img"
                src={relativeHumidity}
                sx={{ height: 48, width: 48 }}
              />
              <Typography>{Math.round(currentWeather.humid * 100)} %RH</Typography>
            </Stack>
          </Stack>
          <Link
            href="https://www.flaticon.com/authors/vectorsmarket15"
            underline="hover"
            component="a"
            color="#e0e0e0"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              pt: 4,
              fontSize: 10,
            }}
          >
            All icons designed by vectorsmarket15 from Flaticon
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}