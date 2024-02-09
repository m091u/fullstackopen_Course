import React from "react";

const CountryDetails = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(
          (language, index) => (
            <li key={index}>{language}</li>
          )
        )}
      </ul>
      <img src={country.flags.svg} alt="Flag" width="150" />

      <h2>Weather in {country.capital[0]}</h2>
    </div>
  );
};

export default CountryDetails;
