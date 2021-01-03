import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from '@material-ui/core';
import cardStyles from '../design/cardStyles';
import { types, useAlert } from 'react-alert'
import { makeStyles } from '@material-ui/core/styles';

import AddAlbum from '../services/AddAlbum';
import RemoveMylist from '../services/RemoveMylist';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
  }
}))

export default function ViewMyAlbum (props) {
  const classes = cardStyles()
  const customClass = useStyles()
  const album = props.album
  const [pictures, setPictures] = useState({})
  const containerWidth = window.innerWidth - 240
  const alert = useAlert()
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (album.id) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages/album_pictures`,
        {
          params: {album_id: album.id},
          withCredentials: true
        }).then(response => {
          if (!response.data.message) {
            setPictures(response.data)
            setRender(false)
          } else {
            alert.show(`${response.data.message}`, { type: types.ERROR })
          }
        }).catch(error => {
          console.log(error)
        })
    }
  }, [album, alert, render])

  return (
    <div>
      {album.id
        ? <div>
          <h2>{album.name}</h2>
          {pictures.length
            ? <Grid container style={{width: containerWidth}}>
                {pictures.map((picture) => {
                  return (
                    <Card key={picture.id} className={classes.root}>
                      <CardMedia
                        className={classes.media}
                        image={picture.image}
                        title={picture.name}
                      />
                      <div className={customClass.details}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {picture.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {picture.description}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <RemoveMylist album={album} picture={picture} setRender={setRender} />
                        </CardActions>
                      </div>
                    </Card>
                  )
                })}
              </Grid>
            : <>
                <p>ピクチャーがありません。</p>
                <Link to="/picture" style={{color: "royalblue"}}>ピクチャー</Link>
                <span>を探して登録しましょう。</span>
              </>
          }
      </div>
        : <>
            <p>アルバムを選択して下さい。</p>
            <AddAlbum setRender={setRender} />
          </>
      }
    </div>
  )
}