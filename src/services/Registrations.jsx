import React, { useState } from 'react'
import axios from 'axios'
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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
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
}))

export default function Registrations (props) {
  // const [user, setUser] = useState({})
  const alert = useAlert()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const submitRegistration = e => {
    axios.post('http://localhost:3001/api/v1/auth/registrations',
    { user: {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation
    }},
    { withCredentials: true }
    ).then(response => {
      props.setUser(response.data.user)
      localStorage.setItem('exp', response.data.exp * 1000)
      clearValues()
      setOpen(false)
      console.log(response)
    }).catch(error => {
      console.log(error)
      alert.show('登録に失敗しました', { type: types.ERROR })
    })
    e.preventDefault()
  }

  const clearValues = () => {
    setValues({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      showPassword: false,
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
    <div className={classes.paper} style={{width: '27ch'}}>
      <h2>新規登録フォーム</h2>
      <form>
        <TextField
          className={ clsx(classes.margin, classes.textField)} 
          // id="standard-basic" 
          label="Name" onChange={handleChange('name')}
        />
        <TextField 
          className={ clsx(classes.margin, classes.textField)} 
          id="standard-basic" 
          label="Email" onChange={handleChange('email')}
        />
        <br/>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
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
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password Confirmation
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password_confirmation}
            onChange={handleChange('password_confirmation')}
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
      </form>
      <div style={{textAlign: "center"}}>
        <Button 
          style={{marginTop: "1em"}} 
          variant="contained" 
          color="primary"
          onClick={(e) => submitRegistration(e)}
        >新規登録</Button>
      </div>
    </div>
  )

  return (
    <div>
      <Button
        style={{marginLeft: "auto"}} 
        color="inherit"
        onClick={() => setOpen(true)}
      >新規登録</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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