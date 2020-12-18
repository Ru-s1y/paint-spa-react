import React from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import Home from './components/Home'
import Album from './components/Album'
import Picture from './components/Picture'
import Paint from './components/Paint'
import NavBar from './components/Navbar'

export default function App() {
  const history = useHistory()
  const moveUrl = (url) => {
    history.push(url)
  }

  return (
    <div>
    <Router>
      <NavBar moveUrl={moveUrl} />

      <Switch>
        <Route path="/"><Home /></Route>
        <Route path="/album"><Album /></Route>
        <Route path="/picture"><Picture /></Route>
        <Route path="/paint"><Paint /></Route>
      </Switch>
    </Router>
    </div>
  )
}
