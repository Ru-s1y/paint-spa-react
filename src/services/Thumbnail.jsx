import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CardMedia } from '@material-ui/core'
import noImage from '../images/501.png'

export default function Thumbnail (props) {
  const [image, setImage] = useState({})
  const album = props.album

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/albums/thumbnail`,
    { 
      withCredentials: true ,
      params: {id: album.id}
    }
    ).then(response => {
      if (response.data) {
        setImage(response.data)
      } else {
        setImage({
          name: "empty",
          image: noImage
        })
        console.log(`${process.env.REACT_APP_SERVER_URL} : ${process.env.REACT_APP_PUBLIC_URL}`)
      }
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