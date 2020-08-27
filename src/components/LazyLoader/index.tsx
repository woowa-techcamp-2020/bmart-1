import React, { createContext, useEffect, useRef, useState } from 'react'
import { Dispatcher } from 'src/types/react-helper'
import './style.scss'

export type LazyLoaderProps = {
  isRemovable?: boolean
  hasCallback?: boolean
}

export const LazyLoaderContext = createContext<{
  isLoaded: boolean
  setLoaded: Dispatcher<boolean>
}>(undefined)

const LazyLoader: React.FC<LazyLoaderProps> = ({
  isRemovable = false,
  hasCallback = false,
  children,
}) => {
  const sentinelRef = useRef<HTMLDivElement>()
  const observer = useRef<IntersectionObserver>()
  const [isLoaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries.find(() => true)

        if (entry.intersectionRatio > 0.01) {
          setLoaded(true)
        } else {
          isRemovable && setLoaded(false)
        }
      },
      { threshold: [0, 0.01, 0.1] }
    )
    observer.current.observe(sentinelRef.current)
  }, [])

  return (
    <div className="lazy-loader">
      <LazyLoaderContext.Provider value={{ isLoaded, setLoaded }}>
        <div className="sentinel" ref={sentinelRef}></div>
        {children}
      </LazyLoaderContext.Provider>
    </div>
  )
}

export default LazyLoader
