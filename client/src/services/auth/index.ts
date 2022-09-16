import { axiosClient } from '../api'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export const ACCESS_COOKIE = 'pucpass-access'

export const setAuhtentication = (value: string): void => {
  const navigate = useNavigate()
  const date = new Date()

  date.setTime(date.getTime() + 5 * 60 * 1000)
  Cookies.set(ACCESS_COOKIE, value, { expires: date })
  navigate('/', { replace: true })
}

export const isAuthenticated = (): boolean => {
  return !!Cookies.get(ACCESS_COOKIE)
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
      Cookies.set(ACCESS_COOKIE, res.data.access_token, { expires: date })
      return res.data
    })
    .catch((err) => {
      throw err
    })
}
