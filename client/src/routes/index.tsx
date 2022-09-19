import React, { FC } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import SignIn from '../pages/SignIn'
import { isAuthenticated } from '../services/auth'
import { RequireAuth } from './RequireAuth'
import { SsoCallback } from './SsoCallback'

const RouteStack: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            isAuthenticated() ? (
              <Navigate to="/" state={{ from: location }} />
            ) : (
              <SignIn />
            )
          }
        />

        <Route
          path="/"
          element={
            <RequireAuth authenticated={isAuthenticated()}>
              <Home />
            </RequireAuth>
          }
        />

        <Route path="/signin/callback" element={<SsoCallback />} />

        {/* not found routes will hit here */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteStack
