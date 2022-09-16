import React, { FC, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { setSessionToken } from '../services/auth'

export const SsoCallback: FC = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.hash)
  setSessionToken(query.get('access_token')!)

  return <Fragment />
}
