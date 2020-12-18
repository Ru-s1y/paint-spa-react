import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar, Typography, Drawer, List, ListItem, Link } from '@material-ui/core';
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

  const classes = useStyles();

  const drawer = (
    <div>
      <List>
        <ListItem button>
          <Link href="/" onClick={e => e.preventDefault}>Home</Link>
        </ListItem>
        <ListItem button>
          <Link href="/album" onClick={e => e.preventDefault}>Album</Link>
        </ListItem>
        <ListItem button>
          <Link href="/picture" onClick={e => e.preventDefault}>Picture</Link>
        </ListItem>
        <ListItem button>
          <Link href="/paint" onClick={e => e.preventDefault}>Paint</Link>
        </ListItem>
      </List>
    </div>
  )

  const changePage = (url) => {
    props.moveUrl(url)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
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