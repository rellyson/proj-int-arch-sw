import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../services/auth'

// eslint-disable-next-line no-undef
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()

  if (!isAuthenticated()) {
    // Redirect them to the / page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} />
  }

  return children
}
