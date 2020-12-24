import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import cardStyles from '../design/cardStyles';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Pagination } from '@material-ui/lab';
import Thumbnail from '../services/Thumbnail';
import EditAlbum from '../services/EditAlbum';

export default function MyAlbums () {
  const classes = cardStyles()
  const [albums, setAlbums] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [render, setRender] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages/index_albums`,
      {
        params: { page: currentPage },
        withCredentials: true
      }
      ).then(response => {
        setAlbums(response.data.albums)
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
      <h2>マイアルバム</h2>
      {albums.length
        ? <div style={{display: "flex"}}>
            {albums.map((album) => {
              return (
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
                        <EditAlbum album={album} setRender={setRender} />
                      </>
                    }
                    title={album.username}
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
          </div>
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