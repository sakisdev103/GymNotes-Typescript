import axios from "axios";

const productionUrl = "https://exercisedb.p.rapidapi.com/exercises/";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const customFetch = axios.create({
  baseURL: productionUrl,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
});
