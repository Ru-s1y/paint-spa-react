import React, { useState, useContext } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom'

import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { 
  AppBar, 
  IconButton, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem,
  Divider,
  CssBaseline,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import PanoramaIcon from '@material-ui/icons/Panorama';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BrushIcon from '@material-ui/icons/Brush';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Login from '../services/Login';
import Registrations from '../services/Registrations';
import Logout from '../services/Logout';
import navbarStyles from '../design/navbarStyle';

import { UserContext } from '../services/Menu';

const NavBar = (props) => {
  const user = useContext(UserContext);
  const classes = navbarStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const clickLink = (e, url) => {
    history.push(url)
    setOpen(false)
    e.preventDefault()
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const navbarStatus = (
    <>
      {!user.id
        ? <>
            <Login setUser={props.setUser} />
            <Registrations setUser={props.setUser} />
          </>
        : <>
            <IconButton edge="end" color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <p style={{marginLeft: "1rem"}}>{user.name}</p>
            <Logout setUser={props.setUser} setExp={props.setExp} />
          </>
      }
    </>
  )

  const drawer = (
    <div className={classes.list}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
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
        <ListItem button onClick={e => clickLink(e, '/album')}>
          <IconButton><MenuBookIcon /></IconButton>
          <Link to="/album">Album</Link>
        </ListItem>
        <ListItem button onClick={e => clickLink(e, '/paint')}>
          <IconButton><BrushIcon /></IconButton>
          <Link to="/paint">Paint</Link>
        </ListItem>
        {user.id &&
          <>
            <Divider />
            <ListItem button onClick={e => clickLink(e, '/mypage')}>
              <IconButton><AccountCircleIcon /></IconButton>
              <Link to="/mypage">My Page</Link>
            </ListItem>
            <ListItem button onClick={e => clickLink(e, '/mypictures')}>
              <IconButton><PanoramaIcon /></IconButton>
              <Link to="/mypictures">My Picture</Link>
            </ListItem>
            <ListItem button onClick={e => clickLink(e, '/myalbums')}>
              <IconButton><MenuBookIcon /></IconButton>
              <Link to="/myalbums">My Album</Link>
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {!open &&
            <>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </>
          }
          <Typography variant="h6" className={classes.title} to="/">
            Pixel Post
          </Typography>
          <div style={{marginLeft: "auto", display: "flex"}}>
            {navbarStatus}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        {drawer}
      </Drawer>
    </div>
  );
}

export default withRouter(NavBar)