import React, { FC, Fragment, useLayoutEffect } from 'react'
import { setSessionToken } from '../services/auth'

const SsoCallback: FC = () => {
  useLayoutEffect(() => {
    const query = new URLSearchParams(location.hash)
    setSessionToken(query.get('access_token')!)

    location.href = '/'
  }, [])

  return <Fragment />
}

export default SsoCallback
