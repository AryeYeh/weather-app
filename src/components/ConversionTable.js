export const locationsTable = [
  {
    cityName: "臺北市",
    locationName: "臺北",
  },
  {
    cityName: "新北市",
    locationName: "板橋",
  },
  {
    cityName: "桃園市",
    locationName: "國二E009K",
  },
  {
    cityName: "臺中市",
    locationName: "臺中",
  },
  {
    cityName: "臺南市",
    locationName: "南區中心",
  },
  {
    cityName: "高雄市",
    locationName: "高雄",
  },
  {
    cityName: "基隆市",
    locationName: "基隆",
  },
  {
    cityName: "新竹市",
    locationName: "國一N094K",
  },
  {
    cityName: "嘉義市",
    locationName: "嘉義",
  },
  {
    cityName: "新竹縣",
    locationName: "新竹",
  },
  {
    cityName: "苗栗縣",
    locationName: "國一S132K",
  },
  {
    cityName: "彰化縣",
    locationName: "彰師大",
  },
  {
    cityName: "南投縣",
    locationName: "國三N223K",
  },
  {
    cityName: "雲林縣",
    locationName: "國一N234K",
  },
  {
    cityName: "嘉義縣",
    locationName: "國一S262K",
  },
  {
    cityName: "屏東縣",
    locationName: "國三S415K",
  },
  {
    cityName: "宜蘭縣",
    locationName: "宜蘭",
  },
  {
    cityName: "花蓮縣",
    locationName: "花蓮",
  },
  {
    cityName: "臺東縣",
    locationName: "臺東",
  },
  {
    cityName: "澎湖縣",
    locationName: "澎湖",
  },
  {
    cityName: "金門縣",
    locationName: "金門",
  },
  {
    cityName: "連江縣",
    locationName: "馬祖",
  },
]

export default function FindLocations(cityName) {
  return locationsTable.find(location => location.cityName === cityName)
}