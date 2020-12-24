import React, { useState, useEffect, useRef, useContext } from 'react';
import '../App.css';
import { 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  Slider, 
  Divider,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import GetAppIcon from '@material-ui/icons/GetApp';

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
  const flagRef = useRef(false)

  const [dataURL, setDataURL] = useState('')
  
  // canvas
  const width = 600
  const height = 500
  const [lineWid, setLineWid] = useState(5)
  const [lineColor, setLineColor] = useState('#000000')
  const [shadowBlur, setShadowBlur] = useState(0)
  const [shadowColor, setShadowColor] = useState('#000000')
  const [eraserFlg, setEraserFlg] = useState('OFF')
  const [fontClr, setFontClr] = useState('gray')
  const dpr = window.devicePixelRatio || 1

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    // canvas内での右クリックを無効にする
    canvas.oncontextmenu = function (e) {
      e.preventDefault()
    }
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
    flagRef.current = true
  }

  // 描画中
  const drawing = ({ nativeEvent }) => {
    if(flagRef.current === false){
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }
  
  // 描画終了
  const finishDrawing = () => {
    contextRef.current.closePath()
    flagRef.current = false
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
    console.log(data)
  }

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
        {/* <Cursor lineColor={lineColor} lineWid={lineWid} shadowColor={shadowColor} shadowBlur={shadowBlur} /> */}
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