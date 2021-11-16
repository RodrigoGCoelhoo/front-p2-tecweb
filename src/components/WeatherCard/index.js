import React, { useState, useEffect } from 'react';
import './style.css';

import api from '../../services/api'
import apiBase from '../../services/apiBase'

import rain from '../../assets/rainColour.png';
import sun from '../../assets/sunColour.png';
import cloud from '../../assets/cloudColour.png';
import cloudy from '../../assets/cloudyColour.png';
import trash from '../../assets/trash.png';
import { toast } from 'react-toastify';

export function WeatherCard(props) {

  const [data, setData] = useState()
  const [forecast, setForecast] = useState([])

  useEffect(async () => {
    const response = await api.get('current?lat=' + props.favData.lat + '&lon=' + props.favData.long + '&key=4672f831b149410a837fdfc43fefa541&lang=pt')
    //console.log(response.data)
    setData(response.data)

    const responseForecast = await api.get('forecast/daily?lat=' + props.favData.lat + '&lon=' + props.favData.long + '&key=4672f831b149410a837fdfc43fefa541&lang=pt&days=1')
    //console.log(responseForecast.data.data)
    setForecast(responseForecast.data.data)
  }, [])

  async function deleteWeather() {
    const response = await apiBase.delete('/city/' + props.favData?.id)
    console.log(response)
    if (response.status === 204) {
      toast.success("Cidade deletada dos favoritos com sucesso!")
    } else {
      toast.error("Erro ao deletar cidade dos favoritos!")
    }

    const favsListTemp = []

    props.favsList.forEach((fav) => {
      if (fav.id !== props.favData.id){
        favsListTemp.push(fav)
      }
    })
    props.setFavsList(favsListTemp)
  }

  return(
    <div className="weathercard-bg">
      <div className="weathercard-header">
        <h3 style={{color: 'white'}}>{props.favData?.cidade}</h3>
        <button className='trash-btn' onClick={deleteWeather}>
          <img src={trash} style={{width: "18px"}}/>
        </button>
      </div>
      <div className="weathercard-temp">
        {data && (
          <img src={require(`../../assets/icons/${data?.data[0].weather.icon}.png`).default} alt="chuva" className="weathercard-icon"></img>
        )}
        <div className="weathercard-temp-values">
          <h1 className="weathercard-day" style={{ color: 'white'}}>{Math.round(data?.data[0].temp)}°</h1>
          {forecast.length > 0 && (
          <div className="weathercard-temp-max-min">
            <h2 style={{ color: "#FF1053" }}>{Math.round(forecast[0]?.max_temp)}°</h2>
            <h2 style={{ color: "#95BCEF" }}>{Math.round(forecast[0]?.min_temp)}°</h2>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeatherCard;