import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardMedia } from '@material-ui/core';
import noImage from '../images/501.png';
import cardStyles from '../design/cardStyles';

export default function Thumbnail (props) {
  const [image, setImage] = useState({})
  const album = props.album
  const classes = cardStyles()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/albums/thumbnail`,
    { 
      params: {id: album.id},
      withCredentials: true
    }
    ).then(response => {
      if (response.data) {
        setImage(response.data)
      } else {
        setImage({
          name: "empty",
          image: noImage
        })
      }
    }).catch(error => {
      console.log(`${album.name} thumbnail:`, error)
    })
  }, [album])

  return (
    <CardMedia
      component="img"
      className={classes.media}
      // style={{height: 250}}
      image={image.image}
      title={image.name}
    />
  )
}