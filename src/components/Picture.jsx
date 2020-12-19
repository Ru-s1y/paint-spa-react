import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

export default function Picture () {
  const [pictures, setPictures] = useState([])
  const history = useHistory()

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/pictures',
      { withCredentials: true }
      ).then(response => {
        setPictures(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, [])


  return(
    <div>
      <h2>Picture</h2>
      <Button variant="contained" color="primary" onClick={() => history.push('/paint')}>ピクチャー作成</Button>
      {pictures.length
        ?
          <div>
            {pictures.map((picture) => {
              return (
                <div key={picture.id}>
                  <p>{picture.name}</p>
                  <p>{picture.description}</p>
                  <p>{picture.user}</p>
                  <p>{picture.name}</p>
                </div>
              )
            })}
          </div>
        : <p>ピクチャーがありません</p>
      }
    </div>
  )
}