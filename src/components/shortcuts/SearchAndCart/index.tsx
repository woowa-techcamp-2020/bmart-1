import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Drawer from 'src/components/Drawer'
import Search from 'src/components/Search'
import './style.scss'

export type SearchAndCartProps = unknown

const SearchAndCart: React.FC<SearchAndCartProps> = () => {
  const [isSearchOpened, setIsSearchOpened] = useState(false)

  const [visibility, setVisibility] = useState<[1 | 0, 1 | 0]>([1, 1])

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/me' || location.pathname === '/cart') {
      setVisibility([0, 0])
    } else if (location.pathname === '/addresses') {
      setVisibility([0, 1])
    } else {
      setVisibility([1, 1])
    }
  }, [location])

  return (
    <>
      <div className="search-and-cart">
        {visibility[0] === 1 && (
          <button
            className="search-shortcut"
            onClick={() => setIsSearchOpened(!isSearchOpened)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.21924 17.3042C11.0947 17.3042 12.8242 16.6978 14.2393 15.687L19.5625 21.0103C19.8096 21.2573 20.1353 21.3809 20.4834 21.3809C21.2134 21.3809 21.73 20.8193 21.73 20.1006C21.73 19.7637 21.6177 19.4492 21.3706 19.2021L16.0811 13.9014C17.1929 12.4414 17.8555 10.6333 17.8555 8.66797C17.8555 3.91748 13.9697 0.0317383 9.21924 0.0317383C4.46875 0.0317383 0.583008 3.91748 0.583008 8.66797C0.583008 13.4185 4.46875 17.3042 9.21924 17.3042ZM9.21924 15.4399C5.51318 15.4399 2.44727 12.374 2.44727 8.66797C2.44727 4.96191 5.51318 1.896 9.21924 1.896C12.9253 1.896 15.9912 4.96191 15.9912 8.66797C15.9912 12.374 12.9253 15.4399 9.21924 15.4399Z"
                fill="var(--distinct)"
              />
            </svg>
          </button>
        )}
        {/* TODO: 아직 000원 이렇게 표시 */}
        {visibility[1] === 1 && (
          <Link to="/cart">
            <button className="cart-shortcut">
              <svg
                width="27"
                height="23"
                viewBox="0 0 27 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: 'translateX(-8%)',
                }}
              >
                <path
                  d="M0.868408 1.4917C0.868408 1.95215 1.25024 2.34521 1.69946 2.34521H5.49536L7.29224 14.6763C7.52808 16.271 8.37036 17.2705 9.99878 17.2705H23.1047C23.5427 17.2705 23.9246 16.9111 23.9246 16.4282C23.9246 15.9453 23.5427 15.5859 23.1047 15.5859H10.1897C9.54956 15.5859 9.15649 15.1367 9.05542 14.4517L8.87573 13.2725H23.1272C24.7668 13.2725 25.6091 12.2617 25.845 10.6558L26.7434 4.71484C26.7659 4.56885 26.7883 4.38916 26.7883 4.28809C26.7883 3.74902 26.384 3.37842 25.7664 3.37842H7.43823L7.21362 1.95215C7.10132 1.0874 6.78687 0.649414 5.64136 0.649414H1.69946C1.25024 0.649414 0.868408 1.04248 0.868408 1.4917ZM9.05542 20.9092C9.05542 21.9312 9.86401 22.7285 10.886 22.7285C11.8967 22.7285 12.7053 21.9312 12.7053 20.9092C12.7053 19.8984 11.8967 19.0898 10.886 19.0898C9.86401 19.0898 9.05542 19.8984 9.05542 20.9092ZM19.5559 20.9092C19.5559 21.9312 20.3757 22.7285 21.3865 22.7285C22.4084 22.7285 23.217 21.9312 23.217 20.9092C23.217 19.8984 22.4084 19.0898 21.3865 19.0898C20.3757 19.0898 19.5559 19.8984 19.5559 20.9092Z"
                  fill="var(--distinct)"
                />
              </svg>
            </button>
          </Link>
        )}
      </div>
      <Drawer
        isOpened={isSearchOpened}
        setOpened={setIsSearchOpened}
        maxHeight="100vh"
      >
        <Search />
      </Drawer>
    </>
  )
}

export default SearchAndCart
