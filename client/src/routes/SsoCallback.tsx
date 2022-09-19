import React, { FC, Fragment } from 'react'
import { useInfo } from '../contexts/user-context'
import { setSessionToken } from '../services/auth'

export const SsoCallback: FC = () => {
  const info = useInfo()!

  const query = new URLSearchParams(location.hash)
  setSessionToken(query.get('access_token')!)
  window.close()

  return <Fragment />
}
