import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PATH } from '../common/constants/path'
import { Error404 } from '../features/Error404/Error404'
import { Login } from '../features/Login/Login'
import { NewPassword } from '../features/NewPassword/NewPassword'
import { Packs } from '../features/Packs/Packs'
import { PasswordRecovery } from '../features/PasswordRecovery/PasswordRecovery'
import { Profile } from '../features/Profile/Profile'
import { Signup } from '../features/Registration/Signup'
import { Test } from '../features/TEST/Test'

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.DEFAULT} element={<Navigate to={PATH.LOGIN} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Signup />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.NAVIGATE_ERROR} element={<Error404 />} />
      <Route path={PATH.TEST} element={<Test />} />
      <Route path={PATH.PACKS} element={<Packs />} />
    </Routes>
  )
}
