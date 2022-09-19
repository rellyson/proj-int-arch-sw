import { axiosClient } from '../api'
import Cookies from 'js-cookie'
import { UserInfo } from '../user'
import { useNavigate } from 'react-router-dom'

export const SESSION_TOKEN = 'pucpass-session-token'

export const setSessionToken = (value: string): void => {
  const date = new Date()
  date.setTime(date.getTime() + 5 * 60 * 1000)
  Cookies.set(SESSION_TOKEN, value, { expires: date })
}

export const logOut = (): void => {
  Cookies.remove(SESSION_TOKEN)
  window.location.reload()
}

export const isAuthenticated = (): boolean => {
  return !!Cookies.get(SESSION_TOKEN)
}

export const authenticate = async (username: string, password: string): Promise<any> => {
  return await axiosClient
    .post(
      '/idp/protocol/openid-connect/token?scopes=profile',
      new URLSearchParams({
        username,
        password,
        client_id: 'client-app',
        grant_type: 'password',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((res) => {
      const date = new Date()
      date.setTime(date.getTime() + 5 * 60 * 1000)
      Cookies.set(SESSION_TOKEN, res.data.access_token, { expires: date })
      return res.data
    })
    .catch((err) => {
      throw err
    })
}

export const getTokenInfo = async (): Promise<UserInfo> => {
  return await axiosClient
    .get('/idp/protocol/openid-connect/userinfo', {
      headers: {
        Authorization: `Bearer ${Cookies.get(SESSION_TOKEN)}`,
      },
    })
    .then((res) => res.data as UserInfo)
    .catch((err) => {
      throw err
    })
}

export const generatePassword = (length: number): string => {
  const availableChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!&#+=-'
  let secret = ''

  for (let i = 0; i < length; i++)
    secret += availableChars.charAt(Math.floor(Math.random() * availableChars.length))

  return secret
}
