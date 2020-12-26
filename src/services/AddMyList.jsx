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
    width: 280,
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

  const [select, setSelect] = useState({})

  const albumAddPicture = (e) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/mypages/register_album`,
    { mylist: {
        picture_id: picture.id,
        album_id: albumId
    }},
    { withCredentials: true }
    ).then(response => {
      const message = response.data.message
      if (message === "success") {
        alert.show(
          `「${picture.name}」をアルバム「${select.name}」に追加しました。`,
          { type: types.SUCCESS }
        )
      } else {
        showErrorAlert("アルバム追加に失敗しました。")
      }
      setModal(false)
    }).catch(error => {
      console.log(error)
      showErrorAlert("アルバム追加に失敗しました。")
    })
    e.preventDefault()
  }

  const pictureRemoveAlbum = (e) => {
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/mypages/destroy_album`,
    {
      params: { picture_id: picture.id, album_id: albumId },
      withCredentials: true
    }).then(response => {
      const message = response.data.message
      if (message === "success") { 
        showSuccessAlert("アルバムから削除しました。")
      } else {
        showErrorAlert("アルバム登録解除に失敗しました。")
      }
    }).catch(error => {
      console.log(error)
      showErrorAlert("アルバム登録解除に失敗しました。")
    })
    e.preventDefault()
  }

  const validateParams = (e) => {
    if (albumId === '') {
      return pictureRemoveAlbum(e)
    }
    return albumAddPicture(e)
  }

  const showSuccessAlert = (msg) => {
    return alert.show(`${msg}`, { type: types.SUCCESS })
  }

  const showErrorAlert = (msg) => {
    return alert.show(`${msg}`, { type: types.ERROR })
  }

  const modalForm = (
    <div style={modalStyle} className={classes.paper}>
      <h3>アルバム追加</h3>
      <p>ピクチャー: {picture.name}</p>
      <AlbumList setAlbumId={setAlbumId} setSelect={setSelect} />
      <div style={{marginTop: "1rem", display: "flex"}}>
        <Button
          variant="contained"
          color="primary"
          onClick={validateParams}
        >
          アルバム追加
        </Button>
        <Button 
          style={{marginLeft: "1rem"}}
          variant="contained" 
          onClick={() => setModal(false)}
        >
          閉じる
        </Button>
      </div>
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