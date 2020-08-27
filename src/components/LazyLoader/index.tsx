import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

export type LazyLoaderProps = {
  isRemovable?: boolean
}

const LazyLoader: React.FC<LazyLoaderProps> = ({
  isRemovable = false,
  children,
}) => {
  const sentinelRef = useRef<HTMLDivElement>()
  const observer = useRef<IntersectionObserver>()
  const [isLoaded, setLoaded] = useState<Boolean>(false)

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
      <div className="sentinel" ref={sentinelRef}></div>
      {isLoaded && children}
    </div>
  )
}

export default LazyLoader
