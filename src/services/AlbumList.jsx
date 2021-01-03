import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from '@material-ui/core/';

export default function AlbumList (props) {
  const [albums, setAlbums] = useState([])
  const [currency, setCurrency] = useState('')

  // if (currency === '') {
  //   console.log("currency is empty")
  // }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages/album_list`,
    { withCredentials: true }
    ).then(response => {
      setAlbums(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  
  const handleChange = (event) => {
    setCurrency(event.target.value)
    props.setAlbumId(event.target.value)
  }

  return (
    <FormControl>
      <FormHelperText>アルバムを選択して下さい。</FormHelperText>
      <Select
        value={currency}
        displayEmpty
        onChange={handleChange}
      >
        {albums.map((album) => {
          return (
            <MenuItem key={album.id} value={album.id}>{album.name}</MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}