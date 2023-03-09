import { Dispatch } from 'redux'

import { authAPI, changeUserParamsType, UserType } from '../../app/api'

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

export const changeUserTC = (data: changeUserParamsType) => (dispatch: Dispatch) => {
  authAPI.changeUser(data).then(res => {
    dispatch(setUserProfileAC(res.data.updatedUser))
  })
}

export type ProfileActionsType = ReturnType<typeof setUserProfileAC>
