import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import Country from "./components/Country";
import CountryDetails from "./components/CountryDetails";
import countriesService from "./services/countries";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const apiKey = import.meta.env.API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [char, setChar] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const searchCountries = (char) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(char.toLowerCase())
    );
    setFilteredCountries(filtered);
    setSelectedCountry(filtered.length === 1 ? filtered[0] : null);
  };

  const handleSearch = (event) => {
    setChar(event.target.value);
    searchCountries(event.target.value);
  };

  const handleDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Data for countries</h1>
      <Search handleSearch={handleSearch} char={char} />

      {char === "" ? null : selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : filteredCountries.length > 11 ? (
        <p>Too many matches. Please make your query more specific.</p>
      ) : filteredCountries.length === 0 ? (
        <p>No data matching the input.</p>
      ) : (
        filteredCountries.map((country) => (
          <Country
            key={country.ccn3}
            country={country}
            handleDetails={() => handleDetails(country)}
          />
        ))
      )}
    </div>
  );
};

export default App;
