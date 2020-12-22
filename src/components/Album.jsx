import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { 
  Button, 
  Grid, 
  Card, 
  CardContent,
  CardActions,
  Typography,
  IconButton
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import cardStyles from '../design/cardStyles'

import { UserContext } from '../services/Menu'
import Thumbnail from '../services/Thumbnail'

export default function Album () {
  const classes = cardStyles()
  const [albums, setAlbums] = useState([])
  const user = useContext(UserContext)
  const [status, setStatus] = useState("Loading...")
  const [page, setPage] = useState({
    current: 1,
    total: 1,
  })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/albums`, 
      { params: { page: page.current } },
      { withCredentials: true }
      ).then(response => {
        setAlbums(response.data.albums)
        setPage({
          current: response.data.meta.current_page,
          total: response.data.meta.total_pages
        })
=======
import { Button, Grid } from '@material-ui/core'

import { UserContext } from '../services/Menu'

export default function Album () {
  const [albums, setAlbums] = useState([])
  const user = useContext(UserContext)
  const [status, setStatus] = useState("Loading...")

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/albums`, 
      { withCredentials: true }
      ).then(response => {
        setAlbums(response.data)
      }).catch(error => {
        console.log(error)
      })
      setStatus("アルバムがありません。")
  }, [])

  return(
    <div>
      <Grid style={{margin: "2rem"}}>
        <h2>Album</h2>
        {user.id &&
          <Button variant="contained" color="primary">アルバム作成</Button>
        }
      </Grid>
      {albums.length
        ? <Grid style={{display: "flex", margin: "1rem"}}>
            {albums.map((album) => {
              return (
                <Card key={album.id} className={classes.root} style={{margin: "1rem"}}>
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
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              )
            })}

          </Grid>
          
        : <p style={{margin: "2rem"}}>{status}</p>
      }
    </div>
  )
}