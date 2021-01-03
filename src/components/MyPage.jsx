import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import cardStyles from '../design/cardStyles';
import Thumbnail from '../services/Thumbnail';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AddAlbum from '../services/AddAlbum';
import EditAlbum from '../services/EditAlbum';
import ViewPicture from './ViewPicture';
import gridStyles from '../design/gridStyles';

export default function MyPage () {
  const [pictures, setPictures] = useState({})
  const [albums, setAlbums] = useState({})
  const classes = gridStyles();
  const styles = cardStyles()
  const history = useHistory();
  const [render, setRender] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages`,
      { withCredentials: true }
      ).then(response => {
        setPictures(response.data.pictures)
        setAlbums(response.data.albums)
        setRender(false)
      }).catch(error => {
        console.log(error)
      })
  }, [render])

  return (
    <div style={{margin: "2rem"}}>
      <Grid>
        <h2>マイページ</h2>
        <Grid style={{margin: "1rem"}}>
          <h3>マイピクチャー</h3>
          <Button variant="contained" color="primary" onClick={() => history.push('/paint')}>
            ピクチャー作成
          </Button>
          <Link to="/mypictures" style={{color: 'royalblue', marginLeft: "1rem"}}>もっとみる</Link>
          <div className={classes.root} style={{marginTop: "1em"}}>
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
                : <p>Loading...</p>
              }
            </div>
        </Grid>
        <div style={{height: "5ch"}}></div>
        <Grid style={{margin: "1rem"}}>
          <h3>マイアルバム</h3>
          <AddAlbum setRender={setRender} />
          <Link to="/myalbums" style={{color: 'royalblue', marginLeft: "1rem"}}>もっとみる</Link>
          {albums.length &&
            <Grid container>
              {albums.map((album) => {
                return(
                  <Card key={album.id} className={styles.root} style={{margin: "1rem"}}>
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
                          <EditAlbum album={album} setRender={setRender} />
                        </>
                      }
                      title={album.name}
                      subheader={`作成日時: ${album.created_at.substr(0,10)}`}
                    />
                    <Thumbnail album={album} />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {album.name}
                      </Typography>
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
      </Grid>
    </div>
  )
};