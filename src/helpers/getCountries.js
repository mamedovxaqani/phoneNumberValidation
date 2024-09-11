import axios from "axios";

const getAllCountries = () => {
  //   try {
  const response = axios.get("https://restcountries.com/v3.1/all");

  return response;
};

export default getAllCountries;
