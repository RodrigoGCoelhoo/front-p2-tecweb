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
  const [cidadeTitle, setCidadeTitle] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [favsList, setFavsList] = useState()

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
    setFavorited(false)
    favsList.forEach((f) => {
      if (cidade.toLowerCase() === f.cidade.toLowerCase()){
        setFavorited(true)
      }
    })
    getForecast(cidade)
    setCidadeTitle(cidade)
  }

  function reSearchForecast(cidadeInput) {
    favsList.forEach((f) => {
      if (cidade.toLowerCase() === f.cidade.toLowerCase()){
        setFavorited(true)
      }
    })
    getForecast(cidadeInput)
    setCidade(cidadeInput)
    setCidadeTitle(cidadeInput)
  }

  async function favChange2Off() {
    setFavorited(false)

    let favsListTemp = []
    favsList.forEach(async (f) => {
      if (cidade.toLowerCase() !== f.cidade.toLowerCase()) {
        favsListTemp.push(f)
      } 
      else {
        console.log(f)
        const response = await apiBase.delete('/city/' + f.id)
        console.log(response)
        if (response.status === 204) {
          toast.success("Cidade deletada dos favoritos com sucesso!")
        } else {
          toast.error("Erro ao deletar cidade dos favoritos!")
        }
      }
    })
    setFavsList(favsListTemp)
  }

  async function favChange2On() {
    if (favsList.length === 4) {
      toast.error("Impossível adicionar mais favoritos.")
      return;
    }
    setFavorited(true)
    await postFav()
  }

  async function postFav() {

    const dataPost = {
      "cidade": cidade,
      "lat": lat,
      "long": long
    }

    axios.post('https://insperweatherapi.herokuapp.com/api/city/',
      dataPost
    )
      .then(res => {
        toast.success("Cidade adicionada aos favoritos com sucesso!")
        getFavs()
      })
      .catch(err => {
        toast.error("Erro ao adicionar favorito!")
      });
  }

  async function getFavs() {
    const response = await apiBase.get('/city/')
    console.log(response.data)
    setFavsList(response.data)
  }

  useEffect(() => {
    getFavs()
  }, [])

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
      {cidadeTitle.length > 0 && <h2 style={{marginTop:"30px", marginBottom:"0px"}}>Previsão para {cidadeTitle}</h2>}
      {forecast.length > 0 && (
        <div className="window-weathers">
          <Weather1d data={forecast[0]} date={d1} />
          <Weather1d data={forecast[1]} date={d2} />
          <Weather1d data={forecast[2]} date={d3} />
          <Weather1d data={forecast[3]} date={d4} />
          <Weather1d data={forecast[4]} date={d5} />
        </div>
      )}
      <h2 className="weather-fav-title">Favoritos</h2>
      <FavBar favsList={favsList} setFavsList={setFavsList} setFavorited={setFavorited} search={reSearchForecast}/>
    </div>
  )
}

export default MainWindow;