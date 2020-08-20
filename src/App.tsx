import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './app.style.scss'
import Bmart from './pages/Bmart'
import Jjims from './pages/Jjims'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
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
