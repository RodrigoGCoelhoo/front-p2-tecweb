import React, { useEffect, useState } from 'react';
import './style.css';
import WeatherCard from '../WeatherCard/index'
import api from '../../services/api'
import apiBase from '../../services/apiBase'

export function FavBar() {

  const [favsList, setFavsList] = useState()

  async function getFavs() {
    const response = await apiBase.get('/city/')    
    setFavsList(response.data)
  }


  useEffect(() => {
    getFavs()
  }, [])

  return(
    <div className="favbar-bg">

      {favsList?.map((fav) => {
        return(
        <WeatherCard key={fav.id} favsList={favsList} favData={fav} setFavsList={setFavsList}/>
        )
      })}

    </div>
  )
}

export default FavBar;