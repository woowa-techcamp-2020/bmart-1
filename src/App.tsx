import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Jjims from './components/Jjims'
import Bmart from './components/Bmart'
import SlideTabs from './components/SlideTabs'
import Logo from './components/Logo'

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Logo />
          <SlideTabs />
        </div>
        <Switch>
          <Route path="/" exact>
            <Bmart />
          </Route>
          <Route path="/sale" exact>
            <Bmart />
          </Route>
          <Route path="/me" exact>
            <Bmart />
          </Route>
          <Route path="/jjims">
            <Jjims />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
