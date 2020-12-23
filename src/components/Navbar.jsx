import React, { useState, useContext } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar, 
  IconButton, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem,
  Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import PanoramaIcon from '@material-ui/icons/Panorama';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BrushIcon from '@material-ui/icons/Brush';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Login from '../services/Login'
import Registrations from '../services/Registrations'
import Logout from '../services/Logout'

import { UserContext } from '../services/Menu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const NavBar = (props) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const history = useHistory()
  const user = useContext(UserContext)

  const clickLink = (e, url) => {
    history.push(url)
    setOpen(false)
    e.preventDefault()
  }

  const drawer = (
    <div style={{width: "10rem"}}>
      <h2 style={{marginLeft: "1em"}}>Sketch</h2>
      <Divider />
      <List>
        <ListItem button onClick={e => clickLink(e, '/')}>
          <IconButton><HomeIcon /></IconButton>
            <Link to="/">Home</Link>
        </ListItem >
        <ListItem button onClick={e => clickLink(e, '/picture')}>
          <IconButton><PanoramaIcon /></IconButton>
          <Link to="/picture">Picture</Link>
        </ListItem>
        <ListItem button onClick={e => clickLink(e, '/paint')}>
          <IconButton><BrushIcon /></IconButton>
          <Link to="/paint">Paint</Link>
        </ListItem>
        <ListItem button onClick={e => clickLink(e, '/album')}>
          <IconButton><MenuBookIcon /></IconButton>
          <Link to="/album">Album</Link>
        </ListItem>
        {user.id &&
          <>
            <ListItem button onClick={e => clickLink(e, '/mypage')}>
              <IconButton><AccountCircleIcon /></IconButton>
              <Link to="/mypage">MyPage</Link>
            </ListItem>
            <ListItem button onClick={e => clickLink(e, '/favorite')}>
              <IconButton><FavoriteIcon /></IconButton>
              <Link to="/favorite">Favorite</Link>
            </ListItem>
          </>
        }
      </List>
    </div>
  )

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sketch
          </Typography>
          {!user.id
            ? <>
                <Login setUser={props.setUser} />
                <Registrations setUser={props.setUser} />
              </>
            : <>
                <IconButton style={{color: "white"}}>
                  <AccountCircleIcon />
                </IconButton>
                <span >{user.name}</span>
                <Logout setUser={props.setUser} setExp={props.setExp} />
              </>
          }
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)} >
        {drawer}
      </Drawer>
    </>
  );
}

export default withRouter(NavBar)