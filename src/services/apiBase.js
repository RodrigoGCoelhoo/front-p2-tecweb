import axios from 'axios';

const apiBase = axios.create({
  baseURL: 'https://insperweatherapi.herokuapp.com/api',
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Content-Type":"application/json"
})

export default apiBase