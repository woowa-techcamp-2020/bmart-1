import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

export type LazyLoaderProps = unknown

const LazyLoader: React.FC<LazyLoaderProps> = ({ children }) => {
  const sentinelRef = useRef<HTMLDivElement>()
  const observer = useRef<IntersectionObserver>()
  const [isLoaded, setLoaded] = useState<Boolean>(false)

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries.find(() => true)

      if (entry.isIntersecting) {
        setLoaded(true)
      }
    })
    observer.current.observe(sentinelRef.current)
  }, [])

  return (
    <div className="lazy-loader">
      <div className="sentinel" ref={sentinelRef}></div>
      {isLoaded && children}
    </div>
  )
}

export default LazyLoader
