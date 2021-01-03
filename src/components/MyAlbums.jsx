import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Toolbar,
  CssBaseline,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import EditAlbum from '../services/EditAlbum';
import ViewMyAlbum from '../components/ViewMyAlbum';

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
                      <div onClick={e => selectAlbum(e, album)}>
                        <ListItem button>
                          <ListItemIcon><ArrowBackIcon /></ListItemIcon>
                          <ListItemText primary={album.name} />
                        </ListItem>
                      </div>
                      <div style={{marginLeft: "auto"}}>
                        <EditAlbum album={album} setRender={setRender} />
                      </div>
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
          :  <ViewMyAlbum album={select} setRender={setRender} />
        }
      </div>
    </div>
  )
}