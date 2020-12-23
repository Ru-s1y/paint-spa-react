import React, { useState, useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from '../components/Home'
import Album from '../components/Album'
import Picture from '../components/Picture'
import Paint from '../components/Paint'
import NavBar from '../components/Navbar'
import axios from 'axios'
import MyPage from '../components/MyPage'
import FavoritePage from '../components/FavoritePage'
import MyPictures from '../components/MyPictures'
import MyAlbums from '../components/MyAlbums'
// import Error from '../components/Error'

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
        console.log('ログインしてください。')
      }
    } else {
      console.log('expがない')
    }
  }, [exp])

  return (
    <div>
      <Router>
        <UserContext.Provider value={user}>
          <NavBar setUser={setUser} setExp={setExp} />
          <div style={{marginTop: "10ch", marginBottom: "5ch"}}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/album" exact>
                <Album />
              </Route>
              <Route path="/picture" exact>
                <Picture />
              </Route>
              <Route path="/paint" exact>
                <Paint />
              </Route>
              {user.id &&
                <>
                  <Route path="/mypage" exact>
                    <MyPage />
                  </Route>
                  <Route path="/favorite" exact>
                    <FavoritePage />
                  </Route>
                  <Route path="/mypictures" exact>
                    <MyPictures />
                  </Route>
                  <Route path="/myalbums" exact>
                    <MyAlbums />
                  </Route>
                </>
              }
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  )
}