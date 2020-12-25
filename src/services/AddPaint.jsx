import React, { useState } from 'react';
import axios from 'axios';
import { useAlert, types } from 'react-alert'
import {
  IconButton,
  Divider,
  TextField,
  FormControlLabel,
  Switch,
  Button,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronLeft';

export default function AddPaint (props) {
  const alert = useAlert()
  const [values, setValues] = useState({
    name: '',
    description: '',
  })
  const [publish, setPublish] = useState(true)
  const dataURL = props.dataURL
  // console.log("dataURL", dataURL)

  const submitForm = (e) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/pictures`,
    { picture: { 
        name: values.name,
        description: values.description,
        image: dataURL,
        publish: publish
    }},
    { withCredentials: true }
    ).then(response => {
      closeDrawer()
      clearAttr()
      alert.show(`「${response.data.name}」を保存しました。`, {type: types.SUCCESS})
    }).catch(error => {
      console.log('err', error)
      alert.show('ピクチャーを保存できませんでした。', {type: types.ERROR})
    })
    e.preventDefault()
  }

  // バリデーション
  const validateForm = (e) => {
    if (values.name === '') {
      return showErrorAlert("名前を入力して下さい。")
    }
    if (!dataURL) {
      return showErrorAlert("イメージがありません。")
    }
    submitForm(e)
  }

  const showErrorAlert = (message) => {
    alert.show(`message`, { type: types.ERROR })
  }

  // drawerを閉じる
  const closeDrawer = () => {
    props.setFOpen(false)
  }

  // ステートのクリア
  const clearAttr = () => {
    setValues({
      name: '',
      description: '',
      publish: true,
    })
  }

  // 公開設定toggle
  const toggleChecked = (e, newValue) => {
    setPublish(newValue)
    // console.log(newValue)
  }

  // stateの変更
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div style={{margin: "1em"}}>
      <form>
        <div>
          <IconButton onClick={closeDrawer}>
            <ChevronRightIcon />
          </IconButton>
          <span style={{color: 'gray'}}>登録フォーム</span>
        </div>
        <Divider />
        <div>
          <TextField
            id="standard-password-input"
            label="画像の名前"
            onChange={handleChange('name')}
          />
          <TextField
            id="standard-password-input"
            label="説明"
            multiline
            onChange={handleChange('description')}
          />
          <FormControlLabel
            control={<Switch checked={publish} onChange={toggleChecked} color="primary" />}
            label="公開設定"
            style={{margin: '1rem auto', color: "gray"}}
          />
        </div>
        <Divider />
        <Button 
          variant="contained" 
          color="primary" 
          style={{marginTop: '1em'}}
          onClick={validateForm}
        >保存
        </Button>
      </form>
    </div>
  )
}