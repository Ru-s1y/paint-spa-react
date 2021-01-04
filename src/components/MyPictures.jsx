import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Button, 
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import PictureForm from '../services/PictureForm';
import gridStyles from '../design/gridStyles';
import { Pagination } from '@material-ui/lab';
import ViewPicture from './ViewPicture';
import AddTags from '../services/AddTags'
import CreateTag from '../services/CreateTag';

export default function MyPictures () {
  const classes = gridStyles()
  const history = useHistory()
  const [pictures, setPictures] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [render, setRender] = useState(false)
  const [status, setStatus] = useState("Loading...")
  const loggedIn = true

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
        setStatus("ピクチャーがありません。")
        setRender(false)
      }).catch(error => {
        console.log(error)
        setStatus("ピクチャー取得に失敗しました。")
      })
  }, [currentPage, render])

  const changePage = (e, page) => {
    setCurrentPage(page)
  }

  return (
    <div style={{marginBottom: "2rem"}}>
    <Grid style={{margin: "2rem"}}>
      <h2>マイピクチャー</h2>
      <div style={{display: "flex"}}>
        <Button 
          variant="contained" 
          color="primary" 
          style={{marginRight: "1em"}}
          onClick={() => history.push('/paint')}
        >
          ピクチャー作成
        </Button>
        <CreateTag setRender={setRender} />
      </div>
    </Grid>
    <div className={classes.root} style={{margin: "2rem"}}>
      {pictures.length
        ? <GridList cellHeight={200} cors={2} className={classes.gridList}>
            {pictures.map((picture) => {
              return (
                <GridListTile key={picture.id} style={{width: 300, height: 300}}>
                  <img src={picture.image} alt={picture.name} style={{backgroundColor: "white"}} />
                  <GridListTileBar
                    title={picture.name}
                    subtitle={<span>by: {picture.username}</span>}
                    classes={{
                      root: classes.titleBar
                    }}
                    actionIcon={
                      <div style={{display: "flex", marginRight: "0.5em"}}>
                        <AddTags picture={picture} setRender={setRender} />
                        <ViewPicture picture={picture} loggedIn={loggedIn} />
                        <PictureForm picture={picture} setRender={setRender} />
                      </div>
                    }
                  />
                </GridListTile>
              )
            })}
          </GridList>
        : <p style={{margin: "2rem"}}>{status}</p>
      }
    </div>
      <Pagination
        style={{ marginLeft: "2rem" }}
        count={totalPages} 
        showFirstButton shape="rounded" 
        onChange={changePage}
      />
    </div>
  )
}