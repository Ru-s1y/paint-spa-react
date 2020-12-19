import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../App.css'
import { 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  Button, 
  Slider, 
  TextField, 
  Switch, 
  FormControlLabel, 
  Input
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
// import SettingsIcon from '@material-ui/icons/Settings';
import UndoIcon from '@material-ui/icons/Undo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

export default function Paint () {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [drawFlg, setDrawFlg] = useState(false)
  const [open, setOpen] = useState(false)
  const [fOpen, setFOpen] = useState(false)
  const [publish, setPublish] = useState(true)

  // canvas
  const width = 600
  const height = 500
  const [lineWid, setLineWid] = useState(5)
  const [lineColor, setLineColor] = useState('#000000')
  const [shadowBlur, setShadowBlur] = useState(0)
  const [shadowColor, setShadowColor] = useState('#000000')
  const [eraserFlg, setEraserFlg] = useState('OFF')
  const [fontClr, setFontClr] = useState('gray')
  // const [cPushArray, setCPushArray] = useState([])
  // const [saveClr, setSaveClr] = useState('gray')
  const dpr = window.devicePixelRatio || 1

  const [picture, setPicture] = useState({
    name: '',
    description: '',
    page: '',
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    // canvas 解像度
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    // 線の設定
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 5
    contextRef.current = ctx
    contextRef.current.shadowColor = "#000000"
  }, [dpr])

  // 描画開始
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setDrawFlg(true)
  }

  // 描画中
  const drawing = ({ nativeEvent }) => {
    if(!drawFlg){
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }
  
  // 描画終了
  const finishDrawing = () => {
    contextRef.current.closePath()
    setDrawFlg(false)
  }

  // クリアボタン
  const canvasClear = () => {
    contextRef.current.clearRect(0, 0, width, height)
  }

  // 線の色
  const handleLineColor = (e) => {
    contextRef.current.globalCompositeOperation = 'source-over'
    contextRef.current.strokeStyle = e.target.value
    setLineColor(e.target.value)
  }

  // 線の幅
  const handleLineChange = (e, newValue) => {
    contextRef.current.lineWidth = newValue
    setLineWid(newValue)
  }

  // 線の影
  const handleShadowBlur = (e, newValue) => {
    setShadowBlur(newValue)
    contextRef.current.shadowBlur = newValue
  }

  // 線の影色
  const handleShadowColor = e => {
    contextRef.current.shadowColor = e.target.value
    setShadowColor(e.target.value)
  }

  // 消しゴム機能
  const handleSetEraser = () => {
    if (eraserFlg === 'OFF') {
      contextRef.current.globalCompositeOperation = 'destination-out'
      setEraserFlg('ON')
      setFontClr('red')
    } else if (eraserFlg === 'ON') {
      contextRef.current.globalCompositeOperation = 'source-over'
      setEraserFlg('OFF')
      setFontClr('gray')
    }
  }

  // 公開設定toggle
  const toggleChecked = (e, newValue) => {
    setPublish(newValue)
    console.log(newValue)
  }

  // 画像のアップロード
  const handlePictureSubmit = e => {
    const cvs = document.getElementById('myCanvas')
    const dataURL = cvs.toDataURL() // 画像データ base64形式
    const pictureObject = {
      name: picture.name,
      description: picture.description,
      image: dataURL,
      publish: publish,
      page: picture.page
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/pictures`,
    { picture: pictureObject },
    // { headers: {'Authorization': `Bearer ${storage}`}},
    { withCredentials: true }
    ).then(response => {
      // console.log('picture upload', response.data)
      clearAttribute()
      // alert.show('ピクチャーを保存しました。', {type: types.SUCCESS})
    }).catch(error => {
      console.log('err', error)
      // alert.show('ピクチャーを保存できませんでした。', {type: types.ERROR})
    })
    // console.log('pictureObject', pictureObject)
    e.preventDefault()
  }

  // stateのクリア
  const clearAttribute = () => {
    setPicture({
      name: '',
      description: '',
      page: ''
    })
  }

  const changePage = (e, newValue) => {
    setPicture({name: newValue})
  }

  const drawer = (
    <div>
      <List>
        <ListItem>
          <p style={{marginRight: '1em'}}>線幅</p>
          <input type="color" value={lineColor} list="color-list" onChange={ e => handleLineColor(e) } />
        </ListItem >
        <ListItem>
        <Slider
          value={lineWid}
          aria-labelledby="discrete-slider-always"
          step={1}
          min={1}
          max={10}
          valueLabelDisplay="auto"
          onChange={handleLineChange}
        />
        </ListItem>
        <ListItem>
          <p style={{marginRight: '1em'}}>線影</p>
          <input type="color" value={shadowColor} list="color-list" onChange={(e) => handleShadowColor(e)} />
        </ListItem>
        <ListItem>
        <Slider
          value={shadowBlur}
          aria-labelledby="discrete-slider-always"
          step={1}
          min={0}
          max={10}
          valueLabelDisplay="auto"
          onChange={handleShadowBlur}
        />
        </ListItem>
      </List>
    </div>
  )

  const formMenu = (
    <div style={{width: "15rem"}}>
      <form style={{margin: "1rem"}}>
        <div>
          <TextField
            id="standard-password-input"
            label="Name"
          />
          <TextField
            id="standard-password-input"
            label="Description"
            multiline
          />
          <FormControlLabel
            control={<Switch checked={publish} onChange={toggleChecked} color="primary" />}
            label="Publish"
            style={{margin: '1rem auto'}}
          />
          <FormControlLabel
            control={<Input value={picture.page} onChange={changePage} />}
            label="page"
          />
        </div>
        <Button variant="contained" color="primary" onClick={(e) => handlePictureSubmit(e)}>保存</Button>
      </form>
    </div>
  )

  return(
    <div>
      <div style={{display: 'flex'}}>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleSetEraser()}>
          <FontAwesomeIcon icon={faEraser} style={{color: `${fontClr}`}} />
        </IconButton>
        <IconButton>
          <UndoIcon />
        </IconButton>
        <IconButton onClick={() => canvasClear()}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => setFOpen(true)}>
          <SaveIcon />
        </IconButton>
      </div>

      <canvas
        id="mycanvas"
        width={width}
        height={height}
        ref={canvasRef}
        className="my-canvas"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
      >HTML5に対応したブラウザを使用してください。</canvas>
      <Drawer open={open} onClose={() => setOpen(false)} >
        {drawer}
      </Drawer>
      <Drawer anchor="right" open={fOpen} onClose={() => setFOpen(false)} >
        {formMenu}
      </Drawer>
    </div>
  )
}