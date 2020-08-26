import { User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { getUser } from 'src/apis'
import { useSigned } from 'src/utils/hooks'
import './style.scss'

export type MeProps = unknown

const Me: React.FC<MeProps> = (props) => {
  const { isSigned, signOut } = useSigned()
  const [user, setUser] = useState<User>(null)

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
      <a href="/auth/login">로그인</a>
      <a onClick={() => signOut()}>로그아웃</a>
      <div>
        {isSigned ? '로그인되어있음' : '로그인 안되어있음'}
        {user && <img src={user.profileImg}></img>}
      </div>
    </div>
  )
}

export default Me
