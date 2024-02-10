import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getAll = (city, apiKey) => {
  const request = axios.get(baseUrl, {
    params: {
      q: city,
      appid: apiKey
    }
  });

  return request.then((response) => response.data);
};

export default { getAll };
