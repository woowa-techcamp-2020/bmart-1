import { useContext, useEffect } from 'react'
import { SignedContext } from './../App'
import { LazyLoaderContext } from './../components/LazyLoader/index'

export function useSigned() {
  const { isSigned, setSigned } = useContext(SignedContext)

  function signIn(token) {
    localStorage.setItem('token', token)
    setSigned(true)
  }

  function signOut() {
    localStorage.removeItem('recentTerms')
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

export function useLazy(callback) {
  const { isLoaded } = useContext(LazyLoaderContext)

  useEffect(() => {
    if (isLoaded) {
      callback && callback()
    }
  }, [isLoaded])
}
