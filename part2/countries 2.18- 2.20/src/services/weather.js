import axios from "axios";
const baseUrl = "https://openweathermap.org";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default {getAll}