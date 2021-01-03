import React, { useState, useContext, useEffect } from 'react';
import { useAlert } from 'react-alert'
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Chip,
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Favorite from '../services/Favorite';
import AddMyList from '../services/AddMyList';

import { UserContext } from '../services/Menu';
import axios from 'axios';

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
  const pictureId = picture.id
  const [modal, setModal] = useState(false)
  const classes = useStyles()
  const user = useContext(UserContext)
  const [render, setRender] = useState(false)
  const [tags, setTags] = useState({})
  const alert = useAlert()
  const loggedIn = props.loggedIn

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/tags/search_tags`,
    { params: {picture_id: pictureId} }
    ).then(response => {
      setTags(response.data)
      setRender(false)
    }).catch(error => {
      console.log(error)
    })
  }, [pictureId, render])

  const handleOpen = () => {
    setModal(true)
  }

  const handleClose = () => {
    setModal(false)
  }

  const handleDelete = (e, tag) => {
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/tags/destroy_picture_tag`,
    {
      params: { tag_id: tag.id, picture_id: picture.id },
      withCredentials: true
    }
    ).then(response => {
      if (!response.data.message) {
        alert.show("タグを削除しました。")
        setRender(true)
      } else {
        alert.show("タグ削除に失敗しました。")
      }
    }).catch(error => {
      console.log(error)
      alert.show("タグ削除に失敗しました。")
    })
    e.preventDefault()
  }

  const body = (
    <Fade in={modal}>
      <div className={classes.paper}>
        <div style={{display: "flex"}}>
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
        <div style={{marginRight: "1em", overflowX: "auto"}}>
          {tags.length > 0 &&
            <>
              {tags.map((tag) => {
                return (
                  <>
                    {loggedIn === true
                      ? <Chip key={tag.id} label={tag.name} onDelete={(e) => handleDelete(e, tag)} />
                      : <Chip key={tag.id} label={tag.name} />
                    }
                  </>
                )
              })}
            </>
          }
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