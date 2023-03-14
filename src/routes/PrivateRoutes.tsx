import React, { FC } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../app/store'
import { PATH } from '../common/constants/path'

export const PrivateRoutes: FC = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
