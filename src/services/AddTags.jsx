import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { types, useAlert } from 'react-alert'
import {
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function AddTags (props) {
  const alert = useAlert()
  const [tags, setTags] = useState([])
  const [select, setSelect] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const picture = props.picture

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/tags/all_tags`,
    ).then(response => {
      setTags(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const addPictureTag = (e) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/tags/create_picture_tag`,
    { 
      picture_id: picture.id,
      tag_id: select.id
    },
    { withCredentials: true }
    ).then(response => {
      if(!response.data.message){
        alert.show("タグを追加しました。", { type: types.SUCCESS })
        props.setRender(true)
      } else {
        alert.show("タグ追加に失敗しました。", { type: types.ERROR })
      }
    }).catch(error => {
      console.log()
      alert.show("タグ追加に失敗しました。", { type: types.ERROR })
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const addClickButton = (e) => {
    handleClose()
    addPictureTag(e)
  }

  return (
    <div>
      <IconButton style={{color: "lightgray"}} onClick={handleClickOpen}>
        <AddCircleOutlineIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        style={{margin: "1rem"}}
      >
        <DialogTitle>タグ追加</DialogTitle>
        <DialogContent>
          <Autocomplete
            onChange={(event, newValue) => {
              setSelect(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            getOptionLabel={(option) => option.name}
            id="combo-box-demo"
            options={tags}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="タグ" variant="outlined" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">閉じる</Button>
          <Button onClick={addClickButton} color="primary" variant="contained">追加</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}