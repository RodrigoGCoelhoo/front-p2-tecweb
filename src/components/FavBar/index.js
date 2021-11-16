import React, { useEffect, useState } from 'react';
import './style.css';
import WeatherCard from '../WeatherCard/index'
import api from '../../services/api'
import apiBase from '../../services/apiBase'

export function FavBar(props) {

  return(
    <div className="favbar-grid">

      {props.favsList?.map((fav) => {
        return(
        <WeatherCard key={fav.id} favsList={props.favsList} favData={fav} 
        setFavsList={props.setFavsList} 
        setFavorited={props.setFavorited}
        search={props.search}/>
        )
      })}

    </div>
  )
}

export default FavBar;