import React, { useState } from 'react';
import axios from 'axios';
import { useAlert, types } from 'react-alert';
import { makeStyles } from '@material-ui/core/styles';
import {
  Menu,
  MenuItem,
  Modal,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  FormGroup,
  IconButton,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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

export default function EditAlbum (props) {
  const classes = useStyles()
  const modalStyle = getModalStyle()
  const alert = useAlert()
  const album = props.album
  const [values, setValues] = useState({
    name: album.name,
    description: album.description,
    publish: false,
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false) 

  const editAlbum = (e) => {
    axios.patch(`${process.env.REACT_APP_SERVER_URL}/albums`,
    { album: {
        name: values.name,
        description: values.description,
        publish: values.publish,
    }},
    { withCredentials: true }
    ).then(response => {
      props.setRender(true)
      alert.show(`「${album.name}」を編集しました。`, { type: types.SUCCESS })
    }).catch(error => {
      alert.show("アルバムの編集に失敗しました。", { type: types.ERROR })
      console.log(error)
    })
    e.preventDefault()
  }

  // 
  const deleteAlbum = (e) => {
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/album`,
    {
      params: { id: album.id },
      withCredentials: true
    }).then(response => {
      alert.show(`「${album.name}」を削除しました。`, { type: types.SUCCESS })
      setOpenD(false)
      handleClose()
    }).catch(error => {
      console.log(error)
      alert.show(`「${album.name}」の削除に失敗しました。`, { type: types.ERROR })
    })
    e.preventDefault()
  }

  // 入力した値をstateに反映
  const handleValueChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // 公開設定のスイッチ
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked })
  }

  // プルダウンメニューを開く
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // プルダウンメニューを閉じる
  const handleClose = () => {
    setAnchorEl(null)
  }

  const modalForm = (
    <div style={modalStyle} className={classes.paper}>
      <FormGroup autoComplete="off" row>
        <h3>編集フォーム</h3>
        <div style={{marginBottom: "1rem"}}>
          <TextField 
            value={values.name}
            label="アルバムの名前" 
            variant="outlined"
            style={{marginBottom: "1em"}}
            onChange={handleValueChange('name')} 
          />
          <TextField 
            value={values.description}
            label="アルバムの内容" 
            variant="outlined"
            multiline 
            rows={4} 
            onChange={handleValueChange('description')} 
          />
          <FormControlLabel
            control={
              <Switch
                checked={values.publish}
                onChange={handleChange}
                name="publish"
                color="primary"
              />
            }
            label="公開設定"
            style={{marginTop: "1em", color: "gray"}}
          />
        </div>
        <Button 
          style={{marginBottom: "0.5em"}} 
          variant="contained" 
          color="primary"
          onClick={editAlbum}
        >
          更新
        </Button>
        <Button 
          style={{margin: "0 0 0.5em 1em"}} 
          variant="contained"
          onClick={() => setOpen(false)}
        >閉じる
        </Button>
      </FormGroup>
    </div>
  )

  const modalDelete = (
    <div style={modalStyle} className={classes.paper}>
      <h3>削除確認</h3>
      <p>「{album.name}」を削除します。</p>
      <p>本当によろしいですか？</p>
      <Button 
        variant="contained" 
        color="secondary"
        onClick={deleteAlbum}
      >
        削除
      </Button>
      <Button 
        variant="contained" 
        style={{marginLeft: "1rem"}} 
        onClick={() => setOpenD(false)}
      >
        閉じる
      </Button>
    </div>
  )

  return (
    <>
      <IconButton aria-label="setting" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setOpen(true)}>
          <EditIcon style={{color: "gray"}} />
          編集
        </MenuItem>
        <MenuItem onClick={() => setOpenD(true)}>
          <DeleteIcon style={{color: "gray"}} />
          削除
        </MenuItem>
      </Menu>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        {modalForm}
      </Modal>

      <Modal open={openD} onClose={() => setOpenD(false)}>
        {modalDelete}
      </Modal>
    </>
  )
}