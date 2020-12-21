import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Button, Grid } from '@material-ui/core'

import { UserContext } from '../services/Menu'

export default function Album () {
  const [albums, setAlbums] = useState([])
  const user = useContext(UserContext)
  const [status, setStatus] = useState("Loading...")

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/albums`, 
      { withCredentials: true }
      ).then(response => {
        setAlbums(response.data)
      }).catch(error => {
        console.log(error)
      })
      setStatus("アルバムがありません。")
  }, [])

  return(
    <div>
      <Grid style={{margin: "1rem"}}>
        <h2>Album</h2>
        {user.id &&
          <Button variant="contained" color="primary">アルバム作成</Button>
        }
      </Grid>
      {albums.length
        ?
          <Grid style={{margin: "1rem"}}>
            {albums.map((album) => {
              return (
                <div key={album.id}>
                  <p>{album.name}</p>
                  <img src={album.image}></img>
                  <p>{album.description}</p>
                  <p>{album.user}</p>
                </div>
              )
            })}
          </Grid>
        : <p style={{margin: "1rem"}}>{status}</p>
      }
    </div>
  )
}