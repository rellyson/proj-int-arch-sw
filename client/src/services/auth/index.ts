import { axiosClient } from '../api'

export const ACCESS_TOKEN = 'pucpass-access-token'

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(ACCESS_TOKEN)
}

export const authenticate = async (email: string, password: string): Promise<any> => {
  return await axiosClient
    .post('/idp/auth', {
      email,
      password,
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}

export const signUpUser = async (
  fullName: string,
  email: string,
  password: string,
): Promise<any> => {
  return await axiosClient
    .post('/idp/auth', {
      fullName,
      email,
      password,
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}
