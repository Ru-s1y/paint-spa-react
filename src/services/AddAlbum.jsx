import React, { useState } from 'react';
import axios from 'axios';
import { TextField } from '@material-ui/core';

export default function AddAlbum () {
  const [values, setValues] = useState({
    name: '',
    description: '',
  })

  return (
    <>
      <form autoComplete="off">
        <TextField label="Name"/>
        <TextField label="Description"/>
      </form>
    </>
  )
}