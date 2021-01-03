import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "white",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minHeight: 300,
  },
  image: {
    width: 300,
    height: 300,
    margin: "0.5rem",
  },
  textContent: {
    position: "relative",
    width: 200,
    marginLeft: "1rem",
  },
  subContent: {
    color: "gray",
    textAlign: "right",
    position: "absolute",
    right: 0,
    bottom: 0,
  }
}));

export default function ViewAlbum (props) {
  const classes = useStyles()
  const album = props.album
  const album_id = album.id
  const [pictures, setPictures] = useState({})
  const [modal, setModal] = useState(false)
  const [render, setRender] = useState(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/albums/pictures`,
      {
        params: { id: album_id },
        withCredentials: true
      }).then(response => {
        setPictures(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, [album_id])

  const handleOpen = () => {
    setModal(true)
  }

  const handleClose = () => {
    setModal(false)
  }

  const clickNext = () => {
    console.log(pictures.length)
    console.log(value + 1)
    if (value < pictures.length-1) {
      setValue(value + 1)
    }
  }

  const body = (
    // <Fade in={modal}>
      <div className={classes.paper} style={{display: 'flex'}}>
        {pictures.length
          ? <>
              <img src={pictures[value].image} alt={pictures[value].name} className={classes.image} />
            </>
          : <img src="" alt="no image" />
        }
        <button onClick={clickNext}>次へ</button>
        <div className={classes.textContent}>
          <h2 style={{borderBottom: "solid 1px lightgray"}}>{album.name}</h2>
          <h4>{album.description}</h4>
          <div className={classes.subContent}>
            <p>
              作成者：{album.username}<br/>
              作成日：{album.created_at.substr(0, 10)}
            </p>
            <div>
              <Button variant="contained" onClick={handleClose} style={{marginLeft: "1em"}}>閉じる</Button>
            </div>
          </div>
        </div>
      </div>
    // </Fade>
  )

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        style={{color: "lightgray"}}
      >
        <OpenInNewIcon />
      </IconButton>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {body}
      </Modal>
    </div>
  )
}