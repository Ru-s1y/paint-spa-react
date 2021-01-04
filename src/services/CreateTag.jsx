import React, { useState } from 'react'
import axios from 'axios'
import { useAlert, types } from 'react-alert'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'

export default function CreateTag (props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const alert = useAlert()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const submitTag = (e) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/tags/create_tag`,
    { tag: {name: value} },
    { withCredentials: true }
    ).then(response => {
      if (!response.data.message) {
        alert.show(`タグ「${response.data.name}」を作成しました。`, { type: types.SUCCESS })
        props.setRender(true)
      } else {
        alert.show("タグ作成に失敗しました。", { type: types.ERROR })
      }
    }).catch(error => {
      console.log(error)
      alert.show("タグ作成に失敗しました。", { type: types.ERROR })
    })
    e.preventDefault()
  }

  const validateValue = (e) => {
    if (value === '') {
      return alert.show("名前を入力してください。", { type: types.ERROR })
    } else {
      handleClose()
      submitTag(e)
    }
  }

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleClickOpen}
      >
        タグ作成
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{margin: "1rem"}}
      >
        <DialogTitle>タグ作成</DialogTitle>
        <DialogContent>
          <TextField
            id=""
            label="タグの名前"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={validateValue} color="primary">作成</Button>
          <Button variant="contained" onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}