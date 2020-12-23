import React, { useState } from 'react';
import axios from 'axios';
import { useAlert, types } from 'react-alert'
import {
  IconButton,
  Modal,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AlbumList from '../services/AlbumList'

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

export default function AddMyList (props) {
  const [modal, setModal] = useState(false)
  const [albumId, setAlbumId] = useState('')
  const picture = props.picture
  const classes = useStyles()
  const modalStyle = getModalStyle()
  const alert = useAlert()

  const albumAddPicture = (event) => {
    axios.patch(`${process.env.REACT_APP_SERVER_URL}/albums`,
    { params: {
        id: picture.id,
        album_id: albumId
    }},
    { withCredentials: true }
    ).then(response => {
      alert.show(
        `「${picture.name}」を「${response.data.name}」を追加しました。`,
        { type: types.SUCCESS }
      )
      setModal(false)
    }).catch(error => {
      console.log(error)
      alert.show("アルバム追加に失敗しました。", { type: types.ERROR })
    })
    event.preventDefault()
  }

  const modalForm = (
    <div style={modalStyle} className={classes.paper}>
      <h3>アルバム追加</h3>
      <p>ピクチャー: {picture.name}</p>
      <AlbumList setAlbumId={setAlbumId} />
      <Button
        variant="contained"
        color="primary"
        style={{margin: "2rem 1rem 1rem 0"}}
        onClick={albumAddPicture}
      >
        アルバム追加
      </Button>
      <Button 
        variant="contained" 
        style={{margin: "2rem 1rem 1rem 0"}}
        onClick={() => setModal(false)}
      >
        閉じる
      </Button>
    </div>
  )

  return (
    <>
      <IconButton onClick={() => setModal(true)}>
        <AddIcon />
      </IconButton>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
      >
        {modalForm}
      </Modal>
    </>
  )
}