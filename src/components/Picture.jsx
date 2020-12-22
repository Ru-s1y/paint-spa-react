import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { 
  Avatar, 
  Button, 
  Card, 
  CardHeader, 
  CardMedia, 
  IconButton, 
  CardActions,
  CardContent,
  Typography,
  Grid
} from '@material-ui/core'
import useStyles from '../design/useStyles'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { UserContext } from '../services/Menu'
import Favorite from '../services/Favorite'

export default function Picture () {
  const [pictures, setPictures] = useState([])
  const [page, setPage] = useState({
    current: 1,
    total: 1,
  })
  const history = useHistory()
  const classes = useStyles()
  const [status, setStatus] = useState("Loading...")
  const user = useContext(UserContext)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/pictures`,
      { params: { page: page.current } }
      ).then(response => {
        setPictures(response.data.pictures)
        setPage({
          current: response.data.meta.current_page,
          total: response.data.meta.total_pages,
        })
      }).catch(error => {
        console.log(error)
      })
      setStatus("ピクチャーがありません。")
  }, [])

  return(
    <div>
      <Grid style={{margin: "2rem"}}>
        <h2>Picture</h2>
        <Button variant="contained" color="primary" onClick={() => history.push('/paint')}>ピクチャー作成</Button>
      </Grid>
      {pictures.length
        ?
          <Grid style={{display: "flex"}}>
            {pictures.map((picture) => {
              return (
                <Grid item key={picture.id} style={{margin: "2rem"}}>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="picture" className={classes.avatar} />
                      }
                      action={
                        <>
                          {user.id && 
                            <IconButton aria-label="setting">
                              <MoreVertIcon />
                            </IconButton>
                          }
                        </>
                      }
                      title={picture.username}
                      subheader={picture.created_at.substr(0,10)}
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
                      </CardActions>
                    }
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        : <p style={{margin: "2rem"}}>{status}</p>
      }
    </div>
  )
}