import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardMedia,
  IconButton,
  Button
<<<<<<< HEAD
} from '@material-ui/core'
import cardStyles from '../design/cardStyles'
import Thumbnail from '../services/Thumbnail'
import MoreVertIcon from '@material-ui/icons/MoreVert';
=======
} from '@material-ui/core';
import cardStyles from '../design/cardStyles'
import Thumbnail from '../services/Thumbnail'
>>>>>>> e5eb53a09862b50c01cbdca4e81846584d733491
import PanoramaIcon from '@material-ui/icons/Panorama';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import PictureForm from '../services/PictureForm'
import AddAlbum from '../services/AddAlbum';
<<<<<<< HEAD
=======
import EditAlbum from '../services/EditAlbum';
>>>>>>> e5eb53a09862b50c01cbdca4e81846584d733491

export default function MyPage () {
  const [object, setObject] = useState({
    pictures: {},
    albums: {}
  });
  const classes = cardStyles();
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages`,
      { withCredentials: true }
      ).then(response => {
        setObject({
          pictures: response.data.pictures,
          albums: response.data.albums
        })
      }).catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div style={{margin: "2rem"}}>
      <Grid>
        <h2>MyPage</h2>
        <Grid style={{margin: "1rem"}}>
          <h3>MyAlbum</h3>
          <AddAlbum />
          {object.albums.length &&
            <Grid>
              {object.albums.map((album) => {
                return(
                  <Card key={album.id} className={classes.root} style={{margin: "1rem"}}>
                    <CardHeader
                      avatar={
                        <IconButton>
                          <MenuBookIcon />
                        </IconButton>
                      }
                      action={
                        <>
                          <IconButton>
                            {album.publish ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
<<<<<<< HEAD
                          <IconButton aria-label="setting">
                            <MoreVertIcon />
                          </IconButton>
=======
                          <EditAlbum album={album} />
>>>>>>> e5eb53a09862b50c01cbdca4e81846584d733491
                        </>
                      }
                      title={album.name}
                      subheader={`作成日時: ${album.created_at.substr(0,10)}`}
                    />
                    <Thumbnail album={album} />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {album.description}
                      </Typography>
                    </CardContent>
                  </Card>
                )
              })}
            </Grid>
          }
        </Grid>
        <Grid style={{margin: "1rem"}}>
          <h3>MyPicture</h3>
          <Button variant="contained" color="primary" onClick={() => history.push('/paint')}>
            ピクチャー作成
          </Button>
          {object.pictures.length &&
            <Grid>
              {object.pictures.map((picture) => {
                return (
                  <Card key={picture.id} className={classes.root} style={{margin: "1rem"}}>
                    <CardHeader
                      avatar={
                        <IconButton>
                          <PanoramaIcon />
                        </IconButton>
                      }
                      action={
                        <>
                          <IconButton>
                            {picture.publish ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                          <PictureForm picture={picture} />
                        </>
                      }
                      title={picture.album_name}
                      subheader={`作成日時: ${picture.created_at.substr(0,10)}`}
                    />
                    <CardMedia 
                      className={classes.media}
                      image={picture.image}
                      title={picture.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {picture.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {picture.description}
                      </Typography>
                    </CardContent>
                  </Card>
                )
              })}
            </Grid>
          }
        </Grid>
      </Grid>
    </div>
  )
};