import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import MainVisual from '../components/MainVisual'

import ViewPicture from './ViewPicture';
import gridStyles from '../design/gridStyles';
import TagsList from '../components/TagsList';

export default function Home () {
  const classes = gridStyles()
  const [pictures, setPictures] = useState({})

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/homes`
      ).then(response => {
        setPictures(response.data.pictures)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  return(
    <div>
      <div style={{height: 512}}>
        <MainVisual />
      </div>
      <div style={{margin: "2rem"}}>
        <div>
          <div style={{borderTop: "solid 1px lightgray"}} />
          <div style={{marginLeft: "2rem"}}>
            <h2>新着ピクチャー</h2>
            <Link to="/picture" style={{color: "royalblue"}}>もっとみる...</Link>
            <div className={classes.root} style={{marginTop: "1em"}}>
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
                : <p>Loading...</p>
              }
            </div>
          </div>
          <div style={{height: "5ch", borderBottom: "solid 1px lightgray"}} />
          <div style={{marginLeft: "2rem"}}>
            <h2>新着タグ</h2>
            <TagsList />
          </div>
          <div style={{height: "5ch", borderBottom: "solid 1px lightgray"}} />
        </div>
      </div>
    </div>
  )
}