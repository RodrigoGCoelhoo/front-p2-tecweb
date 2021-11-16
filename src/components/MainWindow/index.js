import './style.css';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

import searchIcon from '../../assets/search.svg'
import heartOn from '../../assets/heartOn.png'
import heartOff from '../../assets/heartOff.png'

import Weather1d from '../Wheather1D/index'
import FavBar from '../FavBar/index.js'
import api from '../../services/api'
import apiBase from '../../services/apiBase'

export function MainWindow() {

  const [cidade, setCidade] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  const [favorited, setFavorited] = useState(false)
  const [forecast, setForecast] = useState([])
  const d1 = new Date()
  let d2 = new Date()
  d2.setDate(d2.getDate() + 1)
  let d3 = new Date()
  d3.setDate(d3.getDate() + 2)
  let d4 = new Date()
  d4.setDate(d4.getDate() + 3)
  let d5 = new Date()
  d5.setDate(d5.getDate() + 4)


  async function getForecast(cidade) {
    const response = await api.get('forecast/daily?city=' + cidade + '&key=4672f831b149410a837fdfc43fefa541&lang=pt&days=5')

    if (response.status !== 200) {
      toast.error("Cidade inválida", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    setForecast(response.data.data)
    setCidade(response.data.city_name)
    setLat(response.data.lat.toString())
    setLong(response.data.lon.toString())
  }

  function handleChange(value, setter) {
    setter(value)
  }

  function searchForecast() {
    getForecast(cidade)
  }

  function favChange2Off() {
    setFavorited(false)
  }

  async function favChange2On() {
    setFavorited(true)
    await postFav()
  }

  async function postFav(){
    const dataPost = {
      "cidade": {cidade},
      "lat": {lat},
      "long": {long}
    }

    console.log(dataPost)

    axios({
      method: 'post',
      url: 'https://insperweatherapi.herokuapp.com/api/city/',
      data: dataPost,
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="main-bg">
      <div className="search-input-btn">
        {favorited ? (
          <button onClick={favChange2Off} className="fav-btn-on">
            <img src={heartOn} alt="buscar" style={{ width: '24px' }}></img>
          </button>
        ) : (
          <button onClick={favChange2On} className="fav-btn-off">
            <img src={heartOff} alt="buscar" style={{ width: '24px' }}></img>
          </button>
        )}
        <input
          type="text"
          className="city-search"
          placeholder="Digite aqui o nome da cidade..."
          onChange={(value) => handleChange(value.target.value, setCidade)} />
        <button onClick={searchForecast} className="search-btn">
          <img src={searchIcon} alt="buscar" style={{ width: '24px' }}></img>
        </button>
      </div>
      {forecast.length > 0 && (
        <div className="window-weathers">
          <Weather1d data={forecast[0]} date={d1}/>
          <Weather1d data={forecast[1]} date={d2}/>
          <Weather1d data={forecast[2]} date={d3}/>
          <Weather1d data={forecast[3]} date={d4}/>
          <Weather1d data={forecast[4]} date={d5}/>
        </div>
      )}
      <h2 className="weather-fav-title">Favoritos</h2>
      <FavBar />
    </div>
  )
}

export default MainWindow;