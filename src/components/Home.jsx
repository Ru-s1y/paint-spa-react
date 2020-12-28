import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';

import Thumbnail from '../services/Thumbnail';
import ViewPicture from './ViewPicture';
import cardStyles from '../design/cardStyles'
import gridStyles from '../design/gridStyles';

export default function Home () {
  const classes = gridStyles()
  const styles = cardStyles()
  const [pictures, setPictures] = useState({})
  const [albums, setAlbums] = useState({})

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/homes`
      ).then(response => {
        setPictures(response.data.pictures)
        setAlbums(response.data.albums)
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
            <div className={classes.root}>
              {pictures.length
                ? <GridList cellHeight={200} cors={2} className={classes.gridList}>
                    {pictures.map((picture) => (
                      <GridListTile key={picture.id} style={{width: 300, height: 300}}>
                        <img src={picture.image} alt={picture.name} style={{backgroundColor: "white"}} />
                        <GridListTileBar
                          title={picture.name}
                          subtitle={<span>by: {picture.username}</span>}
                          classes={{
                            root: classes.titleBar
                          }}
                          actionIcon={
                            <div style={{display: "flex", color: "rgba(255, 255, 255, 0.54)", marginRight: "0.5em"}}>
                              <ViewPicture picture={picture} />
                            </div>
                          }
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                : <p style={{margin: "2rem"}}>Loading...</p>
              }
            </div>
          </div>
          <div style={{height: "5ch"}}></div>
          <div style={{marginLeft: "2rem"}}>
            <h3>アルバム</h3>
            <Link to="/picture" style={{color: 'royalblue'}}>もっとみる...</Link>
            <div>
              {albums.length
                ? <Grid container>
                  {albums.map((album) => {
                    return (
                      <Card
                        key={album.id}
                        style={{marginRight: "1rem", marginBottom: "1rem"}}
                      >
                        <Thumbnail album={album} />
                        <div className={styles.details}>
                          <CardContent className={styles.content}>
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
                : <p>Loading...</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}