import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './styles/base.scss'

smoothscroll.polyfill()

window.oncontextmenu = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()

  return false
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
