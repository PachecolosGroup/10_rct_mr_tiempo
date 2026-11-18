import axios from "axios";
import type { SearchType } from "../types";

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&limit=1&appid=${appId}`;

      const { data } = await axios.get(geoUrl);

      if (!data.length) {
        console.log("Ciudad no encontrada");
        return;
      }

      const { lat, lon } = data[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      const { data: weatherResult } = await axios.get(weatherUrl);
      console.log(weatherResult);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchWeather,
  };
}
