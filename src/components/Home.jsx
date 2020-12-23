import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

import Thumbnail from '../services/Thumbnail';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    minWidth: 200,
    margin: '1rem',
  },
  media: {
    height: 250,
  },
  list: {
    borderRight: 'solid 5px lightgray',
    width: '20ch',
    backgroundColor: "#EEEEEE",
  },
}));

export default function Home () {
  const classes = useStyles()
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
            {object.pictures.length
              ? <div style={{display: 'flex'}}>
                {object.pictures.map((picture) => {
                  return (
                    <Card 
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
              </div>
              : <></>
            }
          </div>
          <div style={{height: "5ch"}}></div>
          <div style={{marginLeft: "2rem"}}>
            <h3>アルバム</h3>
            <Link to="/picture" style={{color: 'royalblue'}}>もっとみる...</Link>
            {object.albums.length
              ? <div style={{display: 'flex'}}>
                {object.albums.map((album) => {
                  return (
                    <Card className={classes.root}>
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
                </div>
              : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}