import React, { FC, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { setAuhtentication } from '../services/auth'

export const SsoCallback: FC = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  setAuhtentication(query.get('code')!)

  return <Fragment />
}
