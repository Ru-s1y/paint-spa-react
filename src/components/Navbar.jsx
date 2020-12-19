import React, { useState } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar, Typography, Drawer, List, ListItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
}));
const NavBar = (props) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const history = useHistory()

  const clickLink = (e, url) => {
    history.push(url)
    setOpen(false)
    e.preventDefault()
  }

  const drawer = (
    <div style={{width: "10rem"}}>
      <List>
        <ListItem button onClick={e => clickLink(e, '/')}>
          <Link to="/">Home</Link>
        </ListItem >
        <ListItem button onClick={e => clickLink(e, '/album')}>
          <Link to="/album">Album</Link>
        </ListItem>
        <ListItem button onClick={e => clickLink(e, '/picture')}>
          <Link to="/picture">Picture</Link>
        </ListItem>
        <ListItem button onClick={e => clickLink(e, '/paint')}>
          <Link to="/paint">Paint</Link>
        </ListItem>
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
            Sketcher
          </Typography>
          <Button style={{marginLeft: "auto"}} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)} >
        {drawer}
      </Drawer>
    </>
  );
}

export default withRouter(NavBar)