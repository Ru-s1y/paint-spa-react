import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { 
  Avatar, 
  Button, 
  Card, 
  CardHeader, 
  CardMedia, 
  CardActions,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
import cardStyles from '../design/cardStyles';
import { Pagination } from '@material-ui/lab';

import { UserContext } from '../services/Menu';
import Favorite from '../services/Favorite';
import AddMyList from '../services/AddMyList';

export default function Picture () {
  const [pictures, setPictures] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const history = useHistory()
  const classes = cardStyles()
  const [status, setStatus] = useState("Loading...")
  const user = useContext(UserContext)
  const [render, setRender] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/pictures`,
      { params: { page: currentPage } }
      ).then(response => {
        setPictures(response.data.pictures)
        setCurrentPage(response.data.meta.current_page)
        setTotalPages(response.data.meta.total_pages)
      }).catch(error => {
        console.log(error)
      })
      setStatus("ピクチャーがありません。")
  }, [currentPage, render])

  const changePage = (e, page) => {
    setCurrentPage(page)
  }

  return(
    <div style={{marginBottom: "2rem", width: "100vw"}}>
      <Grid style={{margin: "2rem"}}>
        <h2>ピクチャー一覧</h2>
        <Button variant="contained" color="primary" onClick={() => history.push('/paint')}>ピクチャー作成</Button>
      </Grid>
      {pictures.length
        ? <Grid container style={{margin: "1rem"}}>
            {pictures.map((picture) => {
              return (
                  <Card className={classes.root} key={picture.id} style={{margin: "1rem"}}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="picture" className={classes.avatar} />
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
                    {user.id &&
                      <CardActions disableSpacing>
                        <Favorite favorite={picture} url="pictures" />
                        <AddMyList picture={picture} setRender={setRender} />
                      </CardActions>
                    }
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