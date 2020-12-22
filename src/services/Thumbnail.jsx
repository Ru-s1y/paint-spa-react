import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CardMedia } from '@material-ui/core'

export default function Thumbnail (props) {
  const [image, setImage] = useState('')
  const album = props.album

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/albums/thumbnail`,
    { params: {id: album.id} },
    { withCredentials: true }
    ).then(response => {
      setImage(response.data)
    }).catch(error => {
      console.log(`${album.name} thumbnail:`, error)
    })
  }, [album])

  return (
    <CardMedia
      component="img"
      image={image.image}
      title={image.name}
    />
  )
}