import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Favorite from '../services/Favorite';
import AddMyList from '../services/AddMyList';

import { UserContext } from '../services/Menu';

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

export default function ViewPicture (props) {
  const picture = props.picture
  const [modal, setModal] = useState(false)
  const classes = useStyles()
  const user = useContext(UserContext)
  const [render, setRender] = useState(false)

  const handleOpen = () => {
    setModal(true)
  }

  const handleClose = () => {
    setModal(false)
  }

  const body = (
    <Fade in={modal}>
      <div className={classes.paper} style={{display: "flex"}}>
        <img src={picture.image} alt={picture.name} className={classes.image} />
        <div className={classes.textContent}>
          <h2 style={{borderBottom: "solid 1px lightgray"}}>{picture.name}</h2>
          <h4>{picture.description}</h4>
          <div className={classes.subContent}>
            <p>
              作成者：{picture.username}<br/>
              作成日：{picture.created_at.substr(0, 10)}
            </p>
            <div>
              {user.id &&
                <>
                  <Favorite favorite={picture} url="pictures"/>
                  <AddMyList picture={picture} setRender={setRender} />
                </>
              }
              <Button variant="contained" onClick={handleClose} style={{marginLeft: "1em"}}>閉じる</Button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
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