import React from 'react';
import './style.css';

import rain from '../../assets/rain.png';
import sun from '../../assets/sun.png';
import cloud from '../../assets/cloud.png';
import cloudy from '../../assets/cloudy.png';
import windsock from '../../assets/windsock.png';
import humidity from '../../assets/humidity.png';

export function Weather1D(props) {

  const monthDic = {
    1: "Janeiro", 2: "Fevereiro", 3: "Março",
    4: "Abril", 5: "Maio", 6: "Junho",
    7: "Julho", 8: "Agosto", 9: "Setembro",
    10: "Outubro", 11: "Novembro", 12: "Dezembro",
  }

  return (
    <div className="header-weather-1d">
      <div className="weather-date">
        <h1 style={{ margin: "0" }}>{props.date?.getDate()}</h1>
        <h4 className="weather-month">{monthDic[props.date?.getMonth() + 1]}</h4>
      </div>
      <div className="weather-temp">
        <img src={require(`../../assets/icons/${props?.data.weather.icon || 'sun'}.png`).default} className="weather-icon"></img>
        <h1 className="weather-day">{Math.round(props.data?.temp)}°</h1>
        <div className="weather-temp-max-min">
          <h4 style={{ color: "#FF1053" }}>{Math.round(props.data?.max_temp)}°</h4>
          <h4 style={{ color: "#2374DE" }}>{Math.round(props.data?.min_temp)}°</h4>
        </div>
      </div>
      <div className="weather-grid-stats">
        <div className="weather-stats-block">
          <img src={rain} alt="chuva" className="weather-icon-mini"></img>
          <h5 style={{ marginLeft: "5px" }}>{Math.round(props.data?.pop)}%</h5>
        </div>
        <div className="weather-stats-block">
          <img src={cloud} alt="nuvens" className="weather-icon-mini"></img>
          <h5 style={{ marginLeft: "5px" }}>{Math.round(props.data?.clouds)}%</h5>
        </div>
        <div className="weather-stats-block">
          <img src={windsock} alt="vento" className="weather-icon-mini"></img>
          <h5 style={{ marginLeft: "5px" }}>{Math.round(props.data?.wind_spd)} m/s</h5>
        </div>
        <div className="weather-stats-block">
          <img src={humidity} alt="umidade" className="weather-icon-mini"></img>
          <h5 style={{ marginLeft: "5px" }}>{Math.round(props.data?.rh)}%</h5>
        </div>
      </div>
    </div>
  )
}

export default Weather1D;