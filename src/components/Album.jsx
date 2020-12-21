import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'

export default function Album () {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    axios.get('http:localhost:3001/api/v1/albums', 
      { withCredentials: true }
      ).then(response => {
        setAlbums(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  return(
    <div>
      <h2>Album</h2>
      <Button variant="contained" color="primary">アルバム作成</Button>
      {albums.length
        ?
          <div>
            {albums.map((album) => {
              return (
                <div key={album.id}>
                  <p>{album.name}</p>
                  <p>{album.description}</p>
                  <p>{album.user}</p>
                </div>
              )
            })}
          </div>
        : <p>アルバムがありません</p>
      }
    </div>
  )
}