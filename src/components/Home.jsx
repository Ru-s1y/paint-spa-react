import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Thumbnail from '../services/Thumbnail';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Home () {
  const classes = useStyles()
  const theme = useTheme()
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
    <div style={{margin: "2rem"}}>
      <h2>新着ピックアップ</h2>
      <div>
        {object.pictures.length
          ? <>
            {object.pictures.map((picture) => {
              return (
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.cover}
                    image={picture.image}
                    title={picture.name}
                  />
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        {picture.name}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {picture.description}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              )
            })}
          </>
          : <></>
        }
      </div>
      <div style={{width: "50ch"}}>
        {object.albums.length
          ? <>
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
            </>
          : <></>
        }
      </div>
    </div>
  )
}