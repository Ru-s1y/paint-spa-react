import React, { useState } from 'react';
import axios from 'axios';
import { useAlert, types } from 'react-alert'
import { makeStyles } from '@material-ui/core/styles';
import { 
  TextField, 
  Button, 
  FormGroup,
  FormControlLabel,
  Switch,
  Modal,
  Typography,
} from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddAlbum () {
  const [values, setValues] = useState({
    name: '',
    description: '',
    publish: false,
  })
  const [modal, setModal] = useState(false)
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const alert = useAlert()

  const submitAlbum = (e) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/albums`,
      { params: {
          name: values.name,
          description: values.description,
      } },
      { withCredentials: true }
      ).then(response => {
        alert.show(
          `「${response.data.name}」を作成しました。`,
          { type: types.SUCCESS }
        )
        setModal(false)
      }).catch(error => {
        console.log(error)
        alert.show("アルバム作成に失敗しました。", { type: types.ERROR })
      })
    e.preventDefault()
  }

  const handleClose = () => setModal(false)

  const modalForm = (
    <div style={modalStyle} className={classes.paper}>
      <FormGroup autoComplete="off" row>
        <h2>アルバム作成</h2>
        <div>
          <TextField 
            label="Name" 
            variant="outlined"
            style={{marginBottom: "1em"}}
            onChange={e => setValues({name: e.target.value})} 
          />
          <TextField 
            label="Description" 
            variant="outlined"
            multiline 
            rows={4} 
            onChange={e => setValues({description: e.target.value})} 
          />
          <FormControlLabel
            control={<Switch disabled />}
            label="公開設定"
            style={{marginTop: "1em"}}
          />
          <Typography variant="body2" color="textSecondary" style={{margin: "1em 0"}}>
            公開設定はピクチャー登録後に変更できます。
          </Typography>
        </div>
        <Button 
          style={{marginBottom: "0.5em"}} 
          variant="contained" 
          color="primary"
          onClick={submitAlbum}
        >
          アルバム作成
        </Button>
      </FormGroup>
    </div>
  )

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setModal(true)}>
        アルバム作成
      </Button>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalForm}
      </Modal>
    </>
  )
}