import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert, types } from 'react-alert';
import {
  Paper,
  InputBase,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
// import { Autocomplete } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    overflowX: 'auto',
    height: 150,
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  form: {
    padding: '2px 4px',
    margin: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function GetTags (props) {
  const alert = useAlert()
  const classes = useStyles()
  const [value, setValue] = useState({
    name: '',
  })
  const [tags, setTags] = useState({})

  // タグ一覧
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/tags/all_tags`,
    ).then(response => {
      setTags(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  // タグ候補
  const suggestTag = (e) => {
    console.log(e.target.value)
    axios.get(`${process.env.REACT_APP_SERVER_URL}/tags/index_tag`,
    {
      params: { name: value.name }
    }).then(response => {
      if (!response.data.message) {
        setTags(response.data)
      } else {
        showErrorAlert(response.data.message)
      }
    }).catch(error => {
      console.log(error)
    })
    e.preventDefault()
  }

  // タグからピクチャーを取得する
  const searchTag = (e, tag) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/tags/search_pictures`,
    { params: { name: tag.name },
    }).then(response => {
      if (!response.data.message) {
        props.setPictures(response.data.pictures)
        props.setCurrentPage(response.data.meta.current_page)
        props.setTotalPages(response.data.meta.total_pages)
      } else {
        alert.show(`「${value.name}」に一致するものがありません。`, { type: types.ERROR })
      }
    }).catch(error => {
      console.log(error)
      alert.show("検索に失敗しました。", { type: types.ERROR })
    })
    e.preventDefault()
  }

  const showErrorAlert = (msg) => {
    alert.show(`${msg}`, { type: types.ERROR })
  }

  // 入力したとき
  const changeValue = (e) => {
    setValue({
      name: e.target.value
    })
    if (e.target.value.length) {
      suggestTag(e)
    }
  }

  // クリックしたとき
  const clickTag = (e, tag) => {
    setValue({name: tag.name})
    searchTag(e, tag)
  }

  // クリアしたとき
  const clearValue = (e) => {
    setValue({name: ''})
  }

  return (
    <div>
      <div style={{marginBottom: "1em", marginTop: "1em"}}>
        <Paper component="form" className={classes.form}>
          <InputBase
          value={value.name}
            className={classes.input}
            placeholder="タグ検索"
            onChange={changeValue}
            onCompositionEnd={changeValue}
          />
          <IconButton type="submit" className={classes.iconButton} onClick={clearValue}>
            <CloseIcon />
          </IconButton>
        </Paper>
      </div>
      <div className={classes.root}>
        {tags.length > 0 &&
          <>
            {tags.map((tag) => {
              return (
                <Chip 
                  key={tag.id}
                  icon={<SearchIcon />}
                  label={tag.name}
                  onClick={e => clickTag(e, tag)}
                />
              )
            })}
          </>
        }
      </div>
    </div>
  )
}