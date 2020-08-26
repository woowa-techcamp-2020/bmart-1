import React, { createContext, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import './app.style.scss'
import Bmart from './pages/Bmart'
import Jjims from './pages/Jjims'
import { Dispatcher } from './types/react-helper'

export const LoginContext = createContext<{
  isLogged: boolean
  setIsLogged: Dispatcher<boolean>
}>(undefined)

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogged(true)
    }
  }, [])

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged }}>
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
            <Route path="/verified">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>
        </div>
      </Router>
    </LoginContext.Provider>
  )
}

export default App
