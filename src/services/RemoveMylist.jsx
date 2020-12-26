import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAlert, types } from 'react-alert'
import {
  IconButton,
  CardAction,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

export default function RemoveMylist (props) {
  const album = props.album
  const picture = props.picture

  const alert = useAlert()

  const pictureRemoveAlbum = (e) => {
    console.log("picture", picture)
    console.log("album", album)
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/mypages/destroy_album`,
    {
      params: { picture_id: picture.id, album_id: album.id },
      withCredentials: true,
    }
    ).then(response => {
      const message = response.data.message
      if (message === "success") {
        alert.show("アルバム登録を解除しました。")
        props.setRender(true)
      } else {
        showErrorAlert("アルバム登録の失敗しました。")
      }
    }).catch(error => {
      showErrorAlert("アルバム登録の失敗しました。")
      console.log(error)
    })
    e.preventDefault()
  }

  const showErrorAlert = (msg) => {
    alert.show(`${msg}`, { type: types.ERROR })
  }

  // 表示部分
  return (
    <div>
      <IconButton button onClick={pictureRemoveAlbum}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}