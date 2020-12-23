import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function FavoritePage () {
  const [object, setObject] = useState({
    pictures: {},
    albums: {},
  })
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages/favorites`,
      { withCredentials: true }
      ).then(response => {
        setObject({
          pictures: response.data.pictures,
          albums: response.data.albums,
        })
      }).catch(error => {
        console.log(error)
      })
  },[])


  return (
    <div style={{margin: "2rem"}}>
      <h2>Favorites</h2>
      <div style={{margin: "1rem"}}>
        <h3>Favorite Picture</h3>
        {object.pictures.length
          ? <></>
          : <p>
              お気に入りピクチャーがありません。<br/>
              <Link to="/picture" style={{color: "royalblue"}}>
                ピクチャー
              </Link>
              を探して登録してみましょう！！
            </p>
        }
      </div>
      <div style={{margin: "1rem"}}>
        <h3>Favorite Album</h3>
        {object.albums.length
          ? <></>
          : <p>
              お気に入りアルバムがありません。<br/>
              <Link to="/album" style={{color: "royalblue"}}>
                アルバム
              </Link>
              を探して登録してみましょう！！
            </p>
        }
      </div>
    </div>
  )
}