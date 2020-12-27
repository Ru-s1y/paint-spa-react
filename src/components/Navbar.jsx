import React, { useState, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom'

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
  ListItemText,
  ListItemIcon,
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
  const [open, setOpen] = useState(false);

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
        <Link to="/">
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem >
        </Link>

        <Link to="/paint">
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon><BrushIcon /></ListItemIcon>
            <ListItemText primary="Paint" />
          </ListItem>
        </Link>
        
        <Link to="/picture">
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon><PanoramaIcon /></ListItemIcon>
            <ListItemText primary="Picture" />
          </ListItem>
        </Link>
        <Link to="/album">
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon><MenuBookIcon /></ListItemIcon>
            <ListItemText primary="Album" />
          </ListItem>
        </Link>
        {user.id &&
          <>
            <Divider />
            <Link to="/mypage">
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="My Page" />
              </ListItem>
            </Link>
            <Link to="/mypictures">
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon><PanoramaIcon /></ListItemIcon>
                <ListItemText primary="My Picture" />
              </ListItem>
            </Link>
            <Link to="/myalbums">
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon><MenuBookIcon /></ListItemIcon>
                <ListItemText primary="My Album" />
              </ListItem>
            </Link>
            <Link to="/favorite">
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon><FavoriteIcon /></ListItemIcon>
                <ListItemText primary="Favorite" />
              </ListItem>
            </Link>
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