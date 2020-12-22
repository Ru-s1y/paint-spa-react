import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IconButton } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { types, useAlert } from 'react-alert'

// オブジェクトとurlをもらう
export default function Favorite (props) {
  const [color, setColor] = useState('gray')
  const [flag, setFlag] = useState(false)
  const alert = useAlert()
  const favorite_id = props.favorite.id
  const url = props.url
  const favorite_name = props.favorite.name

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/favorite_${url}`,
    { 
      withCredentials: true,
      params: { id: favorite_id }
    }
    ).then(response => {
      if (!response.data.message) {
        setColor('red')
        setFlag(true)
      }
    }).catch(error => {
      console.log(error)
    })
  }, [flag, color, favorite_id, url])

  const clickFavorite = () => {
    if (flag === false) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/favorite_${url}`,
      { id: favorite_id },
      { withCredentials: true }
      ).then(response => {
        setColor('red')
        setFlag(true)
        alert.show(
          `${favorite_name}をお気に入り登録しました。`,
          { type: types.SUCCESS }
        )
      }).catch(error => {
        console.log("Favorite Error: ", error)
        alert.show("お気に入り登録に失敗しました。", { type: types.ERROR })
      })
    } else {
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/favorite_${url}`,
      { 
        params: { id: favorite_id },
        withCredentials: true 
      }
      ).then(response => {
        setColor('gray')
        setFlag(false)
        alert.show(
          `${favorite_name}のお気に入り登録を解除しました。`, 
          { type: types.SUCCESS }
        )
      }).catch(error => {
        console.log("お気に入り登録解除に失敗しました。")
      })
    }
  }

  return (
    <IconButton aria-label="add to favorites" onClick={() => clickFavorite()}>
      <FavoriteIcon style={{color: color}} />
    </IconButton>
  )
}