import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Toolbar,
  CssBaseline,
} from '@material-ui/core';

import EditAlbum from '../services/EditAlbum';
import ViewAlbum from '../components/ViewAlbum';

const drawerWidth = 240

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
}));

export default function MyAlbums () {
  const customClass = useStyle()
  const [albums, setAlbums] = useState({})
  const [render, setRender] = useState(false)
  const [select, setSelect] = useState({})

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages/album_list`,
      { withCredentials: true }
      ).then(response => {
        setAlbums(response.data)
        setRender(false)
      }).catch(error => {
        console.log(error)
      })
  }, [render, select])

  const selectAlbum = (e, album) => {
    setSelect(album)
  }

  return (
    <div>
      <CssBaseline />
      <Drawer
        className={customClass.drawer}
        variant="permanent"
        classes={{
          paper: customClass.drawerPaper
        }}
        anchor="right"
      >
        <Toolbar />
        <ListItem>
          <h2>マイアルバム</h2>
        </ListItem>
        <Divider />
        <div className={customClass.drawerContainer}>
          <List>
            {albums.length
              ? <>
                {albums.map((album) => {
                  return (
                    <div key={album.id} style={{display: "flex"}}>
                      <ListItem button onClick={e => selectAlbum(e, album)}>
                        <ListItemText primary={album.name} />
                      </ListItem>
                      <EditAlbum album={album} setRender={setRender} />
                    </div>
                  )
                })}</>
              : <></>
            }
          </List>
        </div>
      </Drawer>
      <div style={{margin: "2rem"}}>
        {select === ''
          ? <p>アルバムを選択して下さい。</p>
          :  <ViewAlbum album={select} />
        }
      </div>
    </div>
  )
}