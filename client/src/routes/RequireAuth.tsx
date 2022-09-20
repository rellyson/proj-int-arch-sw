import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface RequireAuthProps {
  children: JSX.Element
  authenticated?: boolean
}

// eslint-disable-next-line no-undef
export const RequireAuth: FC<RequireAuthProps> = ({ children, authenticated }) => {
  if (!authenticated) {
    // Redirect them to the / page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: '/' }} />
  }

  return children
}
