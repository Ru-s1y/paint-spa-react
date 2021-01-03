import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { 
  Grid, 
  Card, 
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar
} from '@material-ui/core';
import cardStyles from '../design/cardStyles';
import { Pagination } from '@material-ui/lab';

import { UserContext } from '../services/Menu';
import Thumbnail from '../services/Thumbnail';
import Favorite from '../services/Favorite';
import AddAlbum from '../services/AddAlbum';
// import ViewAlbum from './ViewAlbum';

export default function Album () {
  const classes = cardStyles()
  const [albums, setAlbums] = useState([])
  const user = useContext(UserContext)
  const [status, setStatus] = useState("Loading...")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [render, setRender] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/albums`, 
      { params: { page: currentPage } }
      ).then(response => {
        setAlbums(response.data.albums)
        setCurrentPage(response.data.meta.current_page)
        setTotalPages(response.data.meta.total_pages)
        setRender(false)
      }).catch(error => {
        console.log(error)
      })
      setStatus("アルバムがありません。")
  }, [currentPage, render])

  const changePage = (e, page) => {
    setCurrentPage(page)
  }

  return(
    <div>
      <Grid style={{margin: "2rem"}}>
        <h2>アルバム一覧</h2>
        {user.id &&
          <AddAlbum setRender={setRender} />
        }
      </Grid>
      {albums.length
        ? <Grid container style={{margin: "1rem"}}>
            {albums.map((album) => {
              return (
                <Card key={album.id} className={classes.root} style={{margin: "1rem"}}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="album" className={classes.avatar} />
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
                  <CardActions disableSpacing>
                    {user.id &&
                      <Favorite favorite={album} url="albums" />
                    }
                    {/* <ViewAlbum album={album} /> */}
                  </CardActions>
                </Card>
              )
            })}
          </Grid>
        : <p style={{margin: "2rem"}}>{status}</p>
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