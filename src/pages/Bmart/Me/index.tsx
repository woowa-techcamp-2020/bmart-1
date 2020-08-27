import { User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUser } from 'src/apis'
import ChevronRightIcon from 'src/components/icons/ChevronRightIcon'
import { useSigned } from 'src/utils/hooks'
import './style.scss'

export type MeProps = unknown

const Me: React.FC<MeProps> = () => {
  const { isSigned, signOut } = useSigned()
  const [user, setUser] = useState<User>(null)
  const history = useHistory()

  async function loadUser() {
    setUser(await getUser())
  }

  useEffect(() => {
    if (isSigned) {
      loadUser()

      return
    }

    setUser(null)
  }, [isSigned])

  return (
    <div className="me">
      {isSigned && !user ? (
        <></>
      ) : user ? (
        <div className="signed-in">
          <img src={user.profileImg} className="profile-image" alt="profile" />
          <div className="user-info">
            <p className="opening-ment">좋은 하루 되세요,</p>
            <h1 className="user-name">{user.name}님</h1>
          </div>
          <ol className="menus">
            <li className="address" onClick={() => history.push('/addresses')}>
              <div className="icon address" />
              <div className="title">배송지 설정</div>
              <ChevronRightIcon width="8px" color="#808080" />
            </li>
            <li className="jjim" onClick={() => history.push('/jjims')}>
              <div className="icon jjim" />
              <div className="title">내가 찜한 상품</div>
              <ChevronRightIcon width="8px" color="#808080" />
            </li>
            <li className="cart" onClick={() => history.push('/cart')}>
              <div className="icon cart" />
              <div className="title">장바구니</div>
              <ChevronRightIcon width="8px" color="#808080" />
            </li>
          </ol>
          <button className="sign-out" onClick={() => signOut()}>
            로그아웃 하시게요?{' '}
            <span role="img" aria-label="sad face">
              😢
            </span>
          </button>
        </div>
      ) : (
        <div className="signed-out">
          <a href="/auth/login">
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="github"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M17.2058 0.00622559C7.9814 0.00622559 0.5 7.48624 0.5 16.712C0.5 24.0932 5.2862 30.355 11.9254 32.5644C12.7593 32.7189 13.0293 32.201 13.0293 31.7611V28.6511C8.38234 29.6618 7.4148 26.6798 7.4148 26.6798C6.65469 24.7489 5.55906 24.2352 5.55906 24.2352C4.04302 23.198 5.67461 23.2203 5.67461 23.2203C7.35215 23.3372 8.23477 24.9424 8.23477 24.9424C9.72437 27.4956 12.1425 26.7577 13.0962 26.3303C13.2451 25.2514 13.6781 24.5136 14.157 24.0973C10.4469 23.6727 6.5461 22.2402 6.5461 15.8405C6.5461 14.0154 7.19901 12.5258 8.26679 11.3564C8.09417 10.9346 7.52199 9.23477 8.42967 6.93494C8.42967 6.93494 9.83296 6.48667 13.0252 8.64729C14.3574 8.27697 15.7858 8.09182 17.2058 8.08486C18.6258 8.09182 20.0555 8.27697 21.3906 8.64729C24.58 6.48667 25.9805 6.93494 25.9805 6.93494C26.8896 9.23617 26.3174 10.936 26.1448 11.3564C27.2167 12.5258 27.8641 14.0168 27.8641 15.8405C27.8641 22.2569 23.9563 23.67 20.2365 24.0834C20.8351 24.6013 21.3822 25.6176 21.3822 27.1768V31.7611C21.3822 32.2052 21.6495 32.7273 22.4973 32.563C29.1309 30.3509 33.9115 24.0904 33.9115 16.712C33.9115 7.48624 26.4315 0.00622559 17.2058 0.00622559Z"
                  fill="var(--distinct)"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="33.4115"
                    height="33.4115"
                    fill="white"
                    transform="translate(0.5 0.00622559)"
                  />
                </clipPath>
              </defs>
            </svg>
            GitHub으로 로그인
          </a>
        </div>
      )}
    </div>
  )
}

export default Me
