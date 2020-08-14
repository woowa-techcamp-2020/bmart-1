import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Logo from './components/Logo'
import SlideTabs from './components/SlideTabs'
import Bmart from './pages/Bmart'
import Jjims from './pages/Jjims'

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
