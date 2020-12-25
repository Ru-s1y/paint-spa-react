import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardMedia,
  IconButton,
  Grid,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import cardStyles from '../design/cardStyles';
import PictureForm from '../services/PictureForm';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { Pagination } from '@material-ui/lab';

export default function MyPictures () {
  const classes = cardStyles()
  const [pictures, setPictures] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [render, setRender] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages/index_pictures`,
      {
        params: { page: currentPage },
        withCredentials: true
      }
      ).then(response => {
        setPictures(response.data.pictures)
        setCurrentPage(response.data.meta.current_page)
        setTotalPages(response.data.meta.total_pages)
      }).catch(error => {
        console.log(error)
      })
  }, [currentPage, render])

  const changePage = (e, page) => {
    setCurrentPage(page)
  }

  return (
    <div style={{margin: "2rem"}}>
      <h2>マイピクチャー</h2>
      {pictures.length
        ? <Grid container>
            {pictures.map((picture) => {
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
                        <PictureForm picture={picture} setRender={setRender} />
                      </>
                    }
                    title={picture.username}
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
        : <p></p>
      }
      <Pagination 
        style={{marginLeft: "2rem"}}
        count={totalPages} 
        showFirstButton shape="rounded" 
        onChange={changePage}
      />
    </div>
  )
}