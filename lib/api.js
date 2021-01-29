// lib/api.js

export const getAllCountries = async () => {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/all`,
    );
    const responseJson = await res.json();
    return responseJson;
  };

  export const getQueryCountries = async (query) => {
    const res = await fetch(
        `https://restcountries.eu/rest/v2/name/${query}`,
    );
    const responseJson = await res.json();
    return responseJson;
};

export const getQueryRegion = async (value) => {
    const res = await fetch(
        `https://restcountries.eu/rest/v2/region/${value}`,
    );
    const responseJson = await res.json();
    return responseJson;
};

export const getCountryByCode = async (alpha3Code) => {
    const res = await fetch(
        `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
    );
    const responseJson = await res.json();
    return responseJson;
  };