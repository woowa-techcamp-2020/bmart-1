import React, { createContext, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import './app.style.scss'
import SearchAndCart from './components/shortcuts/SearchAndCart'
import Addresses from './pages/Addresses'
import Bmart from './pages/Bmart'
import Cart from './pages/Cart'
import CategoryDetails from './pages/CategoryDetails'
import Jjims from './pages/Jjims'
import ProductDetails from './pages/ProductDetails'
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
  const { isSigned, initSigned } = useSigned()

  useEffect(() => {
    initSigned()
  }, [])

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
            {isSigned ? <Jjims /> : <Redirect to="/me" />}
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/addresses">
            {isSigned ? <Addresses /> : <Redirect to="/me" />}
          </Route>
          <Route path="/category/:category">
            <CategoryDetails />
          </Route>
          <Route path="/products/:productId">
            <ProductDetails />
          </Route>
          <Route path="/verified">
            <Bmart />
          </Route>
        </Switch>
      </div>
      <SearchAndCart />
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
