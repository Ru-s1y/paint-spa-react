import React, { useState, useEffect, useRef, useContext } from 'react';
import '../App.css';
import { 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  Divider,
  makeStyles,
  useTheme,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import GetAppIcon from '@material-ui/icons/GetApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { UserContext } from '../services/Menu'
// import Cursor from '../config/Cursor'
import AddPaint from '../services/AddPaint';

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
  const classes = useStyles()
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const [fOpen, setFOpen] = useState(false)

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const layerRef = useRef(null)
  const subRef = useRef(null)
  const flagRef = useRef(false)

  const [dataURL, setDataURL] = useState('')
  
  // canvas
  const [dpr, setDpr] = useState(32)
  const [pixel, setPixel] = useState(16)
  const width = pixel * dpr
  const height = pixel * dpr

  const [color, setColor] = useState('#000000')
  const [eraserFlg, setEraserFlg] = useState('OFF')
  const [fontClr, setFontClr] = useState('gray')
  const [grid, setGrid] = useState(false)

  useEffect(() => {
    // ペイントキャンバスの初期設定
    const canvas = canvasRef.current
    // canvas内での右クリックを無効にする
    canvas.oncontextmenu = function (e) {
      e.preventDefault()
    }
    const ctx = canvas.getContext('2d')
    ctx.width = width
    ctx.height = height
    contextRef.current = ctx

    // レイヤーキャンバスの初期設定
    const layer = layerRef.current
    layer.oncontextmenu = function (e) {
      e.preventDefault()
    }
    const lyr = layer.getContext('2d')
    lyr.width = width
    lyr.height = height
    subRef.current = lyr
  }, [height, width])

  // グリッドを描画する
  const canvasGrid = (layer) => {
    layer.setLineDash([1, 2])
    layer.lineWidth = 1
    layer.beginPath()
    for(var i = 0; i < dpr; i++){
      layer.moveTo(i * pixel, 0)
      layer.lineTo(i * pixel, height)
    }
    for(var n = 0; n < dpr; n++){
      layer.moveTo(0, n * pixel)
      layer.lineTo(width, n * pixel)
    }
    layer.stroke()
    layer.closePath()
  }

  // 座標計算
  const getCoordsByEvent = e => {
    const bounds = e.target.getBoundingClientRect()
    return {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top
    }
  }

  // 塗り潰し
  const draw = (x, y) => {
    if (flagRef.current === false) {
      return
    }
    const upperLeftX = Math.floor(x / canvasRef.current.width * width / pixel) * pixel
    const upperLeftY = Math.floor(y / canvasRef.current.height * height / pixel) * pixel
    contextRef.current.fillRect(upperLeftX, upperLeftY, pixel, pixel)
  }

  // 描画開始
  const startDrawing = e => {
    if (e.button <= 1) {
      flagRef.current = true
      const coords = getCoordsByEvent(e)
      draw(coords.x, coords.y)
    }
  }

  // 描画中
  const drawing = e => {
    const coords = getCoordsByEvent(e)
    draw(coords.x, coords.y)
  }
  
  // 描画終了
  const finishDrawing = e => {
    if (e.button <= 1) {
      flagRef.current = false
    }
  }

  // クリアボタン
  const canvasClear = () => {
    contextRef.current.clearRect(0, 0, width, height)
  }

  // 線の色
  const changeColor = (e) => {
    contextRef.current.globalCompositeOperation = 'source-over'
    contextRef.current.fillStyle = e.target.value
    setColor(e.target.value)
  }

  // 消しゴム機能
  const handleSetEraser = () => {
    if (eraserFlg === 'OFF') {
      contextRef.current.globalCompositeOperation = 'destination-out'
      setEraserFlg('ON')
      setFontClr('red')
    } else if (eraserFlg === 'ON') {
      eraserFalse()
    }
  }

  // 消しゴム機能OFF
  const eraserFalse = () => {
    contextRef.current.globalCompositeOperation = 'source-over'
    setEraserFlg('OFF')
    setFontClr('gray')
  }

  // 画像のダウンロード
  const clickDownload = () => {
    const cvs = document.getElementById('myCanvas')
    const dataURL = cvs.toDataURL() // 画像データ base64形式
    console.log('dataURL: ', dataURL)
    const newImg = document.createElement('a')
    document.body.appendChild(newImg)
    newImg.download = `image-${Date.now()}.png`
    newImg.href = dataURL
    newImg.click()
    newImg.remove()
  }

  // フォーム用のボタンを押したときのイベント
  const clickSaveIcon = () => {
    const cvs = document.getElementById('myCanvas')
    const data = cvs.toDataURL()
    setDataURL(data)
    setFOpen(true)
  }

  // ピクセルを大きく
  const addPixel = () => {
    if (pixel < 32) {
      setPixel(pixel * 2)
      gridFalse()
    }
  }

  // ピクセルを小さく
  const subtractPixel = () => {
    if (pixel > 2) {
      setPixel(pixel / 2)
      gridFalse()
    }
  }

  // ピクセル数を増やす
  const addDpr = () => {
    if (dpr < 256) {
      setDpr(dpr * 2)
      gridFalse()
    }
  }

  // ピクセル数を減らす
  const subtractDpr = () => {
    if (dpr > 8) {
      setDpr(dpr / 2)
      gridFalse()
    }
  }

  // グリッド表示の切り替え
  const toggleGrid = e => {
    setGrid(e.target.checked)
    if (e.target.checked) {
      canvasGrid(subRef.current)
    } else {
      subRef.current.clearRect(0, 0, width, height)
    }
    console.log(e.target.checked)
  }

  const gridFalse = () => {
    setGrid(false)
  }
  
  const drawer = (
    <div>
      <List>
        <div className={classes.drawerHeader}>
          <span style={{color: 'gray'}}>設定</span>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem>
          <p style={{marginRight: '1em'}}>ペンの色</p>
          <input type="color" value={color} list="color-list" onChange={ e => changeColor(e) } />
        </ListItem >
        <Divider />
        <ListItem>
          <p>ピクセルの大きさ</p>
        </ListItem>
        <ListItem>
          <IconButton onClick={subtractPixel}>
            <ArrowBackIosIcon />
          </IconButton>
          <p style={{fontSize: "1.3em", margin: "1em"}}>{pixel}</p>
          <IconButton onClick={addPixel}>
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItem>
          <p>ピクセル数</p>
        </ListItem>
        <ListItem>
          <IconButton onClick={subtractDpr}>
            <ArrowBackIosIcon />
          </IconButton>
          <p style={{fontSize: "1.3em", margin: "1em"}}>{dpr} * {dpr}</p>
          <IconButton onClick={addDpr}>
          <ArrowForwardIosIcon />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={grid}
                onChange={toggleGrid}
                name=""
                color="primary"
              />
            }
            label="グリッドの有無"
            style={{marginTop: "1em", color: "gray"}}
          />
        </ListItem>
      </List>
    </div>
  )

  return(
    <div>
      <div>
        <div style={{textAlign: "center"}}>
          <IconButton onClick={() => setOpen(true)}>
            <SettingsIcon />
          </IconButton>
          <span style={{marginLeft: "1em"}}></span>
          <input
            type="color"
            value={color}
            list="color-list"
            style={{border: "solid 1px lightgray"}}
            onChange={ e => changeColor(e) }
          />
          <span style={{marginLeft: "1em"}}></span>
          <IconButton onClick={eraserFalse}>
            <EditIcon style={{color: color}} />
          </IconButton>
          <IconButton onClick={() => handleSetEraser()}>
            <FontAwesomeIcon icon={faEraser} style={{color: `${fontClr}`}} />
          </IconButton>
          <IconButton onClick={() => canvasClear()}>
            <DeleteIcon />
          </IconButton>
          <span style={{marginLeft: "1em"}}></span>
          <IconButton onClick={clickDownload}>
            <GetAppIcon />
          </IconButton>
          {user.id &&
            <IconButton onClick={clickSaveIcon}>
              <SaveIcon />
            </IconButton>
          }
        </div>

        <div className="canvas-wrapper">
          <canvas
            id="layerCanvas"
            width={width}
            height={height}
            ref={layerRef}
            style={{backgroundColor: "#EEEEEE"}}
          ></canvas>
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
        </div>
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
        <AddPaint setFOpen={setFOpen} dataURL={dataURL} />
      </Drawer>
    </div>
  )
}