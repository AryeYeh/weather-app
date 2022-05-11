import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Stack,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { locationsTable } from "./ConversionTable";


const locations = locationsTable.map(location => location.cityName)
//console.log(locations)

const theme = createTheme({
  palette: {
    locationSelectStyle: {
      main: "#fafafa"
    },
    buttonStyle: {
      bgColor: "#757575",
      textColor: "#fafafa"
    }
  }
})

export default function LocationSettings(props) {
  const { setCurrentPage, cityName, setCurrentCity } = props
  const [locationName, setLocationName] = useState(cityName)
  const handleSelect = (event, value) => {
    //console.log(value)
    setLocationName(value)
  }
  const handleType = (e) => {
    //console.log(e.target.value)
    setLocationName(e.target.value)
  }
  const handleSave = () => {
    if (locations.includes(locationName)) {
      console.log(`儲存的縣市為：${locationName}`)
      setCurrentCity(locationName)
      setCurrentPage("WeatherCard")
    } else {
      alert(`選擇無效：您輸入的「${locationName}」並非有效的縣市`)
    }
  }

  return (
    <div>
      <Card sx={{
        minWidth: 400,
        minHeight: 640,
        maxHeight: 640,
        backgroundColor: "#1e88e5",
      }}>
        <CardHeader
          title="地區設定"
          subheader={
            <Typography sx={{ color: "#e0e0e0" }}>
              所在城市
            </Typography>
          }
          sx={{ color: "#e0e0e0" }}
        />
        <CardContent
          sx={{
            height: 450,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Autocomplete
              id="location-select"
              sx={{ width: 300, bgcolor: "#607d8b", borderRadius: 1, boxShadow: 5 }}
              options={locations}
              onChange={handleSelect}
              renderInput={
                (e) =>
                  <TextField
                    {...e}
                    focused
                    label="請選擇您所在的縣市"
                    color="locationSelectStyle"
                    onChange={handleType}
                    sx={{
                      input: {
                        color: "#fafafa",
                      },
                    }}
                  />
              }
            />
          </ThemeProvider>
        </CardContent>
        <Stack direction="row" spacing={8} justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setCurrentPage("WeatherCard")}
          >
            返回
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
          >
            儲存
          </Button>
        </Stack>
      </Card>
    </div >
  )
}