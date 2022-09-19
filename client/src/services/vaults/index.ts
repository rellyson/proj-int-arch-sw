import Cookies from 'js-cookie'
import { axiosClient } from '../api'
import { SESSION_TOKEN } from '../auth'

export interface VaultItem {
  Id?: string
  Name: string
  UsernameOrEmail: string
  Password: string
  Link?: string
  CreationDate: Date
  UpdateDate?: Date
}

export const getVaultItems = async (): Promise<any> => {
  return await axiosClient
    .get('/vaults/items', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get(SESSION_TOKEN)}`,
      },
    })
    .then((res) => {
      return res.data as VaultItem[]
    })
    .catch((err) => {
      throw err
    })
}

export const createVaultItem = async (
  name: string,
  usernameOrEmail: string,
  password: string,
  link?: string,
) => {
  return await axiosClient
    .post(
      '/vaults/item',
      {
        name,
        usernameOrEmail,
        password,
        link,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get(SESSION_TOKEN)}`,
        },
      },
    )
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}
