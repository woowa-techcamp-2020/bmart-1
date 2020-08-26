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

export const SignedContext = createContext<{
  isSigned: boolean
  setSigned: Dispatcher<boolean>
}>(undefined)

const App: React.FC = () => {
  const [isSigned, setSigned] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSigned(true)
    }
  }, [])

  return (
    <SignedContext.Provider value={{ isSigned, setSigned }}>
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
    </SignedContext.Provider>
  )
}

export default App
