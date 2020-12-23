import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useAlert, types } from 'react-alert'
import '../App.css';
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
  Divider,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from '../services/Menu'
import Cursor from '../config/Cursor'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

export default function Paint () {
  const user = useContext(UserContext)
  const alert = useAlert()

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const classes = useStyles()
  const theme = useTheme()
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

  const [values, setValues] = useState({
    name: '',
    description: '',
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
    // const pictureObject = {
    //   name: values.name,
    //   description: values.description,
    //   image: dataURL,
    //   publish: publish,
    //   // user_id: user.id
    // }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/pictures`,
    { picture: { 
        name: values.name,
        description: values.description,
        image: dataURL,
        publish: publish
    }},
    { withCredentials: true }
    ).then(response => {
      // console.log('picture upload', response.data)
      setFOpen(false)
      clearAttribute()
      alert.show('ピクチャーを保存しました。', {type: types.SUCCESS})
    }).catch(error => {
      console.log('err', error)
      alert.show('ピクチャーを保存できませんでした。', {type: types.ERROR})
    })
    // console.log('pictureObject', pictureObject)
    e.preventDefault()
  }

  // stateのクリア
  const clearAttribute = () => {
    setValues({
      name: '',
      description: '',
      page: ''
    })
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const drawer = (
    <div>
      <List>
        <div className={classes.drawerHeader}>
          <span style={{color: 'gray'}}>ペンの設定</span>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
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
        <Divider />
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
        <Divider />
      </List>
    </div>
  )

  const formMenu = (
    <div style={{margin: "1em"}}>
      <form>
        <div>
          <IconButton onClick={() => setFOpen(false)}>
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
          onClick={(e) => handlePictureSubmit(e)}
        >保存
        </Button>
      </form>
    </div>
  )

  return(
    <div>
      <div className="canvas-container">
        <div>
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
          {user.id &&
            <IconButton onClick={() => setFOpen(true)}>
              <SaveIcon />
            </IconButton>
          }
        </div>

        <canvas
          id="myCanvas"
          width={width}
          height={height}
          ref={canvasRef}
          className="my-canvas"
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
        >
          HTML5に対応したブラウザを使用してください。
        </canvas>
        <Cursor lineColor={lineColor} lineWid={lineWid} shadowColor={shadowColor} shadowBlur={shadowBlur} />
      </div>

      <Drawer 
        open={open} 
        onClose={() => setOpen(false)} 
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        {drawer}
      </Drawer>
      <Drawer 
        anchor="right" 
        open={fOpen} 
        onClose={() => setFOpen(false)} 
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        {formMenu}
      </Drawer>
    </div>
  )
}