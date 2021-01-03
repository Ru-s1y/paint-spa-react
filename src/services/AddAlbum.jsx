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
    width: '40ch',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddAlbum (props) {
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
      { album: {
          name: values.name,
          description: values.description,
      } },
      { withCredentials: true }
      ).then(response => {
        if (response.data.message) {
          alert.show()
        } else {
          alert.show(
            `「${response.data.name}」を作成しました。`,
            { type: types.SUCCESS }
          )
          setModal(false)
          props.setRender(true)
        }
      }).catch(error => {
        console.log(error)
        showErrorAlert("アルバム作成に失敗しました。")
      })
    e.preventDefault()
  }

  const validationForm = (e) => {
    if (values.name === '') {
      return showErrorAlert("名前を入力して下さい。")
    }
    submitAlbum(e)
  }

  const showErrorAlert = (msg) => {
    alert.show(`${msg}`, { type: types.ERROR })
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(event.target.value)
  };

  const handleClose = () => setModal(false)

  const modalForm = (
    <div style={modalStyle} className={classes.paper}>
      <FormGroup autoComplete="off" row>
        <h3>アルバム作成</h3>
        <div>
          <TextField 
            label="アルバムの名前" 
            variant="outlined"
            style={{marginBottom: "1em"}}
            onChange={handleChange('name')} 
          />
          <TextField 
            label="アルバムの内容" 
            variant="outlined"
            multiline 
            rows={4} 
            onChange={handleChange('description')} 
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
        <div style={{display: "flex"}}>
          <Button
            variant="contained" 
            color="primary"
            onClick={validationForm}
          >
            アルバム作成
          </Button>
          <Button 
            variant="contained"
            onClick={() => setModal(false)}
            style={{marginLeft: "1rem"}}
          >
            閉じる
          </Button>
        </div>
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