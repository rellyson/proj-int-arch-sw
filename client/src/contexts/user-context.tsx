import * as React from 'react'
import { useState } from 'react'
import { UserInfo } from '../services/auth'

type UserProviderProps = { children: React.ReactNode }

type UserContextType = {
  userInfo: UserInfo
  userInfoUpdater: (info: UserInfo) => void
}

const UserContext = React.createContext<UserContextType | null>(null)

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    isLogged: false,
  })

  const userInfoUpdater = (info: UserInfo) => {
    setUserInfo(info)
  }

  return (
    <UserContext.Provider value={{ userInfo, userInfoUpdater }}>
      {children}
    </UserContext.Provider>
  )
}

function useInfo() {
  return React.useContext(UserContext)
}

export { UserProvider, useInfo }
