import axios, { AxiosError } from 'axios'

import { authAPI, changeUserParamsType, UserType } from '../../app/api'
import { setAppError } from '../../app/app-reducer'
import { AppRootThunk } from '../../app/store'

const initialState = {
  _id: 'bla-bla',
  email: 'supercat@meow.com',
  name: 'Super Cat',
  avatar: null,
  publicCardPacksCount: 5,

  created: null,
  updated: null,
  isAdmin: false,
  verified: false,
  rememberMe: false,

  error: null,
}

export const profileReducer = (
  state: UserType = initialState,
  action: ProfileActionsType
): UserType => {
  switch (action.type) {
    case 'profile/SET-USER-PROFILE':
      return { ...action.profile }
    default:
      return state
  }
}

export const setUserProfileAC = (profile: UserType) =>
  ({ type: 'profile/SET-USER-PROFILE', profile } as const)

export const changeUserTC =
  (data: changeUserParamsType): AppRootThunk =>
  async dispatch => {
    try {
      const res = await authAPI.changeUser(data)

      dispatch(setUserProfileAC(res.data.updatedUser))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppError(error))
      } else {
        dispatch(setAppError(err.message ? err.message : 'Some error occurred'))
      }
    }
  }

export type ProfileActionsType = ReturnType<typeof setUserProfileAC>
