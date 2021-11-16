import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.weatherbit.io/v2.0/',
})

export default api