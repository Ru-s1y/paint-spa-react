// import React, { useState } from 'react';
import bgImage from '../images/background-two.png';
import {
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const backgroundStyles = {
  height: "100%",
  backgroundImage: "url(" + bgImage + ")",
  backgroundRepeat: "repeat-x",
  position: "relative",
}

const styles = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: "auto",
  width: 400,
  height: 300,
  // border: "solid 1px blue",
}

const inner = {
  textAlign: "center",
  color: "white",
  textShadow: "1px 1px 2px #000, -1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000",
  // border: "solid 1px black",
}

export default function MainVisual () {
  const history = useHistory()

  const clickButton = () => {
    history.push('/paint')
  }

  return (
    <div style={backgroundStyles}>
      <div style={styles}>
        <div style={inner}>
          <p style={{fontSize: 40}}>Pixel Post</p>
          <p style={{fontSize: 20}}>ドット絵の作成・投稿アプリ</p>
          <p>インストール不要ですぐ使える。</p>
          <Button variant="contained" color="primary" onClick={clickButton}>描いてみる</Button>
          <p>※投稿機能を利用するにはログインする必要があります。</p>
        </div>
      </div>
    </div>
  )
}