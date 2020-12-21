import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Avatar, Button, Card, CardHeader } from '@material-ui/core'
import useStyles from '../design/useStyles'

export default function Picture () {
  const [pictures, setPictures] = useState([])
  const [page, setPage] = useState({
    current: 1,
    total: 1,
  })
  const history = useHistory()
  const classes = useStyles()
  const [status, setStatus] = useState("Loading...")

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/pictures`,
      { params: { page: page.current } },
      { withCredentials: true }
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
  }, [page.current])


  return(
    <div>
      <h2>Picture</h2>
      <Button variant="contained" color="primary" onClick={() => history.push('/paint')}>ピクチャー作成</Button>
      {pictures.length
        ?
          <div>
            {pictures.map((picture) => {
              return (
                <div key={picture.id}>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          R
                        </Avatar>
                      }
                    />
                  </Card>
                </div>
              )
            })}
          </div>
        : <p>{status}</p>
      }
    </div>
  )
}