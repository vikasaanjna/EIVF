import axios from "axios";

const instace = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
});

export default instace;
