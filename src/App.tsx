import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './app.style.scss'
import Bmart from './pages/Bmart'
import CategoryDetails from './pages/CategoryDetails'
import Jjims from './pages/Jjims'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Bmart path="home" />
          </Route>
          <Route path="/sale" exact>
            <Bmart path="sale" />
          </Route>
          <Route path="/me" exact>
            <Bmart path="me" />
          </Route>
          <Route path="/jjims">
            <Jjims />
          </Route>
          <Route path="/category/:category">
            <CategoryDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
