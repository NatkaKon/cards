import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI, LoginParamsType } from '../../app/api'

const initialState = {
  isLoggedIn: false,
}

type initialStateType = typeof initialState

export const authReducer = (
  state: initialStateType = initialState,
  action: ActionsType
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
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  authAPI
    .login(data)
    .then(res => {
      console.log(res.data)
      dispatch(setLoggedInAC(true))
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      console.log('error: ', error)
    })
}

//types
type ActionsType = SetLoggedInActionType
type SetLoggedInActionType = ReturnType<typeof setLoggedInAC>
