import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Home from '../components/Home'
import Album from '../components/Album'
import Picture from '../components/Picture'
import Paint from '../components/Paint'
import NavBar from '../components/Navbar'

export default function Menu () {
  return (
    <div>
      <Router>
        <NavBar />

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
        </Switch>
      </Router>
    </div>
  )
}