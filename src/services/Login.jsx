import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Modal,
  Backdrop
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx'
import { useAlert, types } from 'react-alert'

const useStyles = makeStyles((theme) => ({
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

export default function Login (props) {
  // const [user, setUser] = useState({})
  const alert = useAlert()
  const classes = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  })
  const [modal, setModal] = useState(false)

  const submitLogin = (e) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/user_token`,
      { user: { 
          email: values.email, 
          password: values.password 
      }},
      { withCredentials: true }
      ).then(response => {
        props.setUser(response.data.user)
        localStorage.setItem('exp', response.data.exp * 1000)
        clearValues()
        setModal(false)
        alert.show(`ようこそ、${response.data.user.name}さん！`, { type: types.SUCCESS })
        console.log(response)
      }).catch(error => {
        console.log(error)
        alert.show('ログインに失敗しました。', { type: types.ERROR })
      })
    e.preventDefault()
  }

  const clearValues = () => {
    setValues({
      email: '',
      password: ''
    })
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const modalForm = (
    <div className={classes.paper}>
      <form autoComplete="off">
        <h2>ログインフォーム</h2>
        <TextField 
          className={clsx(classes.margin, classes.textField)} 
          // id="standard-basic" 
          label="Email" onChange={handleChange('email')}
        />
        <br/>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            // id="standard-adornment-password"
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
          <Button 
            style={{marginTop: "1em"}} 
            variant="contained" 
            color="primary"
            onClick={(e) => submitLogin(e)}
          >ログイン</Button>
        </div>
      </form>
    </div>
  )

  return (
    <div>
      <Button 
        style={{marginLeft: "auto"}} 
        color="inherit"
        onClick={() => setModal(true)}
      >ログイン</Button>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        {modalForm}
      </Modal>
    </div>
  )
}