import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core';

import Thumbnail from '../services/Thumbnail';
import cardStyles from '../design/cardStyles';

export default function Home () {
  const classes = cardStyles()
  const [object, setObject] = useState({
    pictures: {},
    albums: {}
  })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/homes`
      ).then(response => {
        setObject({
          pictures: response.data.pictures,
          albums: response.data.albums
        })
      }).catch(error => {
        console.log(error)
      })
  }, [])

  return(
    <div>
      <div style={{margin: "2rem"}}>
        <h2>新着ピックアップ</h2>
        <div>
          <div style={{marginLeft: "2rem"}}>
            <h3>ピクチャー</h3>
            <Link to="/picture" style={{color: "royalblue"}}>もっとみる...</Link>
            {object.pictures
              ? <Grid container>
                {object.pictures.map((picture) => {
                  return (
                    <Card
                      key={picture.id}
                      className={classes.root}
                    >
                      <CardMedia
                        className={classes.media}
                        image={picture.image}
                        title={picture.name}
                      />
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          {picture.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {picture.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  )
                })}
              </Grid>
              : <></>
            }
          </div>
          <div style={{height: "5ch"}}></div>
          <div style={{marginLeft: "2rem"}}>
            <h3>アルバム</h3>
            <Link to="/picture" style={{color: 'royalblue'}}>もっとみる...</Link>
            {object.albums
              ? <Grid container>
                {object.albums.map((album) => {
                  return (
                    <Card
                      key={album.id}
                      className={classes.root}
                    >
                      <Thumbnail album={album} />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography component="h5" variant="h5">
                            {album.name}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {album.description}
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  )
                })}
                </Grid>
              : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}