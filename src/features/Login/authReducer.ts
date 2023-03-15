import { AxiosError, isAxiosError } from 'axios'

import { authAPI, LoginParamsType } from '../../app/api'
import { setAppError, setAppInitialization } from '../../app/app-reducer'
import { AppRootThunk } from '../../app/store'
import { setUserProfileAC } from '../Profile/profile-reducer'

const initialState = {
  isLoggedIn: false,
}

type initialStateType = typeof initialState

export const authReducer = (
  state: initialStateType = initialState,
  action: AuthActionsType
): initialStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN': {
      return { ...state, isLoggedIn: action.value }
    }
    default:
      return state
  }
}

export const setLoggedInAC = (value: boolean) =>
  ({
    type: 'LOGIN/SET-IS-LOGGED-IN',
    value,
  } as const)

export const loginTC =
  (data: LoginParamsType): AppRootThunk =>
  async dispatch => {
    try {
      const res = await authAPI.login(data)

      dispatch(setUserProfileAC(res.data))
      dispatch(setLoggedInAC(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppError(error))
      } else {
        dispatch(setAppError(err.message ? err.message : 'Some error occurred'))
      }
    } finally {
      dispatch(setAppInitialization(true))
    }
  }

export const logoutTC = (): AppRootThunk => dispatch => {
  authAPI.logout().then(res => {
    dispatch(setLoggedInAC(false))
  })
}

//types
export type AuthActionsType = SetLoggedInActionType
type SetLoggedInActionType = ReturnType<typeof setLoggedInAC>
