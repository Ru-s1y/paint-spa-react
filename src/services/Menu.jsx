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
          // console.log(response.data)
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
              <Route path="/mypage" exact>
                <MyPage />
              </Route>
            }
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  )
}