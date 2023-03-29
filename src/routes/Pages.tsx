import React, { FC } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PATH } from '../common/constants/path'
import { Cards } from '../features/Cards/Cards'
import { Error404 } from '../features/Error404/Error404'
import { Learning } from '../features/Learning/Learning'
import { Login } from '../features/Login/Login'
import { NewPassword } from '../features/NewPassword/NewPassword'
import { Packs } from '../features/Packs/Packs'
import { PasswordRecovery } from '../features/PasswordRecovery/PasswordRecovery'
import { Profile } from '../features/Profile/Profile'
import { Signup } from '../features/Registration/Signup'
import { Test } from '../features/TEST/Test'

import { PrivateRoutes } from './PrivateRoutes'

export const Pages: FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route index element={<Navigate to={PATH.PACKS} />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.CARDS} element={<Cards />} />
      </Route>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Signup />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.TEST} element={<Test />} />
      <Route path={PATH.NAVIGATE_ERROR} element={<Error404 />} />
      <Route path={PATH.ERROR404} element={<Navigate to={PATH.NAVIGATE_ERROR} />} />
      <Route path={PATH.LEARNING} element={<Learning />} />
    </Routes>
  )
}
