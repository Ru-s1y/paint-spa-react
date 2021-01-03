import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Button, 
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import PictureForm from '../services/PictureForm';
import gridStyles from '../design/gridStyles';
import { Pagination } from '@material-ui/lab';
import ViewPicture from './ViewPicture';
import AddTags from '../services/AddTags'

export default function MyPictures () {
  const classes = gridStyles()
  const history = useHistory()
  const [pictures, setPictures] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [render, setRender] = useState(false)
  const [status, setStatus] = useState("Loading...")
  const loggedIn = true

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/mypages/index_pictures`,
      {
        params: { page: currentPage },
        withCredentials: true
      }
      ).then(response => {
        setPictures(response.data.pictures)
        setCurrentPage(response.data.meta.current_page)
        setTotalPages(response.data.meta.total_pages)
        setStatus("ピクチャーがありません。")
      }).catch(error => {
        console.log(error)
        setStatus("ピクチャー取得に失敗しました。")
      })
  }, [currentPage, render])

  const changePage = (e, page) => {
    setCurrentPage(page)
  }

  return (
    <div style={{marginBottom: "2rem"}}>
    <Grid style={{margin: "2rem"}}>
      <h2>マイピクチャー</h2>
      <Button variant="contained" color="primary" onClick={() => history.push('/paint')}>ピクチャー作成</Button>
    </Grid>
    <div className={classes.root} style={{margin: "2rem"}}>
      {pictures.length
        ? <GridList cellHeight={200} cors={2} className={classes.gridList}>
            {pictures.map((picture) => (
              <GridListTile key={picture.id} style={{width: 300, height: 300}}>
                <img src={picture.image} alt={picture.name} style={{backgroundColor: "white"}} />
                <GridListTileBar
                  title={picture.name}
                  subtitle={<span>by: {picture.username}</span>}
                  classes={{
                    root: classes.titleBar
                  }}
                  actionIcon={
                    <div style={{display: "flex", marginRight: "0.5em"}}>
                      <AddTags picture={picture} setRender={setRender} />
                      <ViewPicture picture={picture} loggedIn={loggedIn} />
                      <PictureForm picture={picture} setRender={setRender} />
                    </div>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        : <p style={{margin: "2rem"}}>{status}</p>
      }
    </div>
    <Pagination
      style={{ marginLeft: "2rem" }}
      count={totalPages} 
      showFirstButton shape="rounded" 
      onChange={changePage}
    />
  </div>
    // <div style={{margin: "2rem"}}>
    //   <h2>マイピクチャー</h2>
    //   {pictures.length
    //     ? <Grid container>
    //         {pictures.map((picture) => {
    //           return (
    //             <Card key={picture.id} className={classes.root} style={{margin: "1rem"}}>
    //               <CardHeader
    //                 avatar={
    //                   <IconButton>
    //                     <PanoramaIcon />
    //                   </IconButton>
    //                 }
    //                 action={
    //                   <>
    //                     <IconButton>
    //                       {picture.publish ? <VisibilityIcon /> : <VisibilityOffIcon />}
    //                     </IconButton>
    //                     <PictureForm picture={picture} setRender={setRender} />
    //                   </>
    //                 }
    //                 title={picture.username}
    //                 subheader={`作成日時: ${picture.created_at.substr(0,10)}`}
    //               />
    //               <CardMedia
    //                 className={classes.media}
    //                 image={picture.image}
    //                 title={picture.name}
    //               />
    //               <CardContent>
    //                 <Typography gutterBottom variant="h5" component="h2">
    //                   {picture.name}
    //                 </Typography>
    //                 <Typography variant="body2" color="textSecondary" component="p">
    //                   {picture.description}
    //                 </Typography>
    //               </CardContent>
    //               <CardActions>
    //                 <ViewPicture picture={picture} />
    //               </CardActions>
    //             </Card>
    //           )
    //         })}
    //       </Grid>
    //     : <p></p>
    //   }
    //   <Pagination 
    //     style={{marginLeft: "2rem"}}
    //     count={totalPages} 
    //     showFirstButton shape="rounded" 
    //     onChange={changePage}
    //   />
    // </div>
  )
}