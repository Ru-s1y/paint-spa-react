import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import gridStyles from '../design/gridStyles';
import ViewPicture from '../components/ViewPicture'

export default function FavoritePage () {
  const [pictures, setPictures] = useState({})
  const classes = gridStyles()
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages/favorites`,
      { withCredentials: true }
      ).then(response => {
        setPictures(response.data.pictures)
      }).catch(error => {
        console.log(error)
      })
  },[])

  return (
    <div style={{margin: "2rem"}}>
      <h3>お気に入りピクチャー</h3>
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
        : <p>
            お気に入りピクチャーがありません。<br/>
            <Link to="/picture" style={{color: "royalblue"}}>
              ピクチャー
            </Link>
            を探して登録してみましょう！！
          </p>
      }
    </div>
  )
}