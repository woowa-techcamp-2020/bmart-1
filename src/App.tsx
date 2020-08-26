import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './app.style.scss'
import Bmart from './pages/Bmart'
import Jjims from './pages/Jjims'
import { Dispatcher } from './types/react-helper'
import { useSigned } from './utils/hooks'

export const SignedContext = createContext<{
  isSigned: boolean
  setSigned: Dispatcher<boolean>
}>(undefined)

const SignedContextProvider: React.FC = ({ children }) => {
  const [isSigned, setSigned] = useState<boolean>(false)

  return (
    <SignedContext.Provider value={{ isSigned, setSigned }}>
      {children}
    </SignedContext.Provider>
  )
}

const AppRouter: React.FC = () => {
  const { initSigned } = useSigned()

  useEffect(() => {
    initSigned()
  }, [])

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
          <Route path="/verified">
            <Bmart />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

const App: React.FC = () => {
  return (
    <SignedContextProvider>
      <AppRouter></AppRouter>
    </SignedContextProvider>
  )
}

export default App
