import React, { useState } from 'react';
import clsx from 'clsx';
import { withRouter, useHistory, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar, 
  Button, 
  IconButton, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem,
  Modal,
  TextField,
  Backdrop,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
  const [modal, setModal] = useState(false)
  const classes = useStyles()
  const history = useHistory()

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const clickLink = (e, url) => {
    history.push(url)
    setOpen(false)
    e.preventDefault()
  }

  const handleClose = () => setModal(false)

  const drawer = (
    <div style={{width: "10rem"}}>
      <h2 style={{marginLeft: "1em"}}>Sketch</h2>
      <Divider />
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

  const modalForm = (
    <div className={classes.paper}>
      <form>
        <h2>ログインフォーム</h2>
        <TextField 
          className={clsx(classes.margin, classes.textField)} 
          id="standard-basic" 
          label="Email" onChange={handleChange('email')}
        />
        <br/>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div style={{textAlign: "center"}}>
          <Button style={{marginTop: "1em"}} variant="contained" color="primary">Login</Button>
          <p><b style={{color: "royalblue"}}>新規登録</b> または <b style={{color: "royalblue"}}>ゲスト</b></p> 
        </div>
      </form>
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
          <Button 
            style={{marginLeft: "auto"}} 
            color="inherit"
            onClick={() => setModal(true)}
          >Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)} >
        {drawer}
      </Drawer>

      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        {modalForm}
      </Modal>
    </>
  );
}

export default withRouter(NavBar)