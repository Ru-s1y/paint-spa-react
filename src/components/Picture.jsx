import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
  Button, 
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import gridStyles from '../design/gridStyles';

import ViewPicture from '../components/ViewPicture';
import GetTags from '../services/GetTags';
import CreateTag from '../services/CreateTag';
import AddTags from '../services/AddTags';
import UserContext from '../services/Menu';

export default function Picture () {
  const [pictures, setPictures] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const history = useHistory()
  const [status, setStatus] = useState("Loading...")
  const classes = gridStyles()
  const loggedIn = false
  const [render, setRender] = useState(false)
  const user = useContext(UserContext)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/pictures`,
      { params: { page: currentPage } }
      ).then(response => {
        setPictures(response.data.pictures)
        setCurrentPage(response.data.meta.current_page)
        setTotalPages(response.data.meta.total_pages)
        setRender(false)
      }).catch(error => {
        console.log(error)
      })
      setStatus("ピクチャーがありません。")
  }, [currentPage, render])

  const changePage = (e, page) => {
    setCurrentPage(page)
  }

  return(
    <div style={{marginBottom: "2rem"}}>
      <Grid style={{margin: "2rem"}}>
        <h2>ピクチャー一覧</h2>
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
        <GetTags 
          setPictures={setPictures} 
          setCurrentPage={setCurrentPage} 
          setTotalPages={setTotalPages}
        />
      </Grid>
      <div className={classes.root} style={{margin: "2rem"}}>
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
                      <div style={{display: "flex", marginRight: "0.5em"}}>
                        {user.id &&
                          <AddTags picture={picture} setRender={setRender} />
                        }
                        <ViewPicture picture={picture} loggedIn={loggedIn} />
                      </div>
                    }
                  />
                </GridListTile>
              ))}
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