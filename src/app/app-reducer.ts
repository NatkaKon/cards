import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setLoggedInAC } from '../features/Login/authReducer'
import { setUserProfileAC } from '../features/Profile/profile-reducer'

import { authAPI } from './api'

const initialState: initialStateType = {
  status: 'loading',
  error: null,
  isInitialized: false,
}

export const appReducer = (
  state: initialStateType = initialState,
  action: AppActionType
): initialStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/INITIALIZE-APP':
      return { ...state, isInitialized: action.isInitialized }
    default:
      return state
  }
}

export const setAppError = (error: AppErrorType) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppInitialization = (isInitialized: boolean) =>
  ({ type: 'APP/INITIALIZE-APP', isInitialized } as const)

export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    const resp = await authAPI.me()

    dispatch(setUserProfileAC(resp.data))
    dispatch(setLoggedInAC(true))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppError(error))
    } else {
      dispatch(setAppError(err.message ? err.message : 'Some error occurred'))
    }
  } finally {
    dispatch(setAppInitialization(true))
  }
}

//types
export type SetAppErrorType = ReturnType<typeof setAppError>
type InitializeAppType = ReturnType<typeof setAppInitialization>
export type AppActionType = SetAppErrorType | InitializeAppType
type AppErrorType = string | null
type initialStateType = {
  status: 'loading'
  error: AppErrorType
  isInitialized: boolean
}
