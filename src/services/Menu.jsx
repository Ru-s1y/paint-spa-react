import React, { useState, useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { Toolbar } from '@material-ui/core'

import Home from '../components/Home'
// import Album from '../components/Album'
import Picture from '../components/Picture'
import Paint from '../components/Paint'
import NavBar from '../components/Navbar'
import axios from 'axios'
import MyPage from '../components/MyPage'
import FavoritePage from '../components/FavoritePage'
import MyPictures from '../components/MyPictures'
import MyAlbums from '../components/MyAlbums'
import Error from '../components/Error'
// import ViewAlbum from '../components/ViewAlbum'

export const UserContext = createContext()

export default function Menu () {
  const [user, setUser] = useState({})
  const [exp, setExp] = useState(localStorage.getItem('exp'))

  useEffect(() => {
    if (exp) {
      if (new Date().getTime() < exp) {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/users/current_user`,
        { withCredentials: true }
        ).then(response => {
          setUser(response.data)
        }).catch(error => {
          console.log(error)
          setUser({})
        })
      } else {
        setExp('')
        localStorage.removeItem('exp')
      }
    } else {
      console.log('exp is not exist')
    }
  }, [exp])

  return (
    <div>
      <Router>
        <UserContext.Provider value={user}>
          <NavBar setUser={setUser} setExp={setExp} />
          <div style={{marginBottom: "5ch"}}>
            <Toolbar />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              {/* <Route path="/album" exact>
                <Album />
              </Route> */}
              <Route path="/picture" exact>
                <Picture />
              </Route>
              <Route path="/paint" exact>
                <Paint />
              </Route>
              <Route path="/mypage" exact>
                {user.id
                  ? <MyPage />
                  : <Error />
                }
              </Route>
              <Route path="/favorite" exact>
                {user.id
                  ? <FavoritePage />
                  : <Error />
                }
              </Route>
              <Route path="/mypictures" exact>
                {user.id
                  ? <MyPictures />
                  : <Error />
                }
              </Route>
              <Route path="/myalbums" exact>
                {user.id
                  ? <MyAlbums />
                  : <Error />
                }
              </Route>
              <Route component={Error} />
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  )
}