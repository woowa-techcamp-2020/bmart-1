import { useContext } from 'react'
import { SignedContext } from './../App'

export function useSigned() {
  const { isSigned, setSigned } = useContext(SignedContext)

  function signIn(token) {
    localStorage.setItem('token', token)
    setSigned(true)
  }

  function signOut() {
    localStorage.removeItem('token')
    setSigned(false)
  }

  function initSigned() {
    if (localStorage.getItem('token')) {
      setSigned(true)
    }
  }

  return { signIn, signOut, initSigned, isSigned }
}
