import axios, { AxiosError } from 'axios'

import { setAppError } from '../../app/app-reducer'

const initState: InitStateType = {
  isRegistered: false,
}

export const signupReducer = (state: InitStateType = initState, action: SignupActionType) => {
  switch (action.type) {
    case 'AUTH/REGISTER':
      return { ...state, isRegistered: action.value }
    default:
      return { ...state }
  }
}
export const registerUser =
  (values: SignupFormType) /*AppThunkDispatch*/ => async (dispatch: any) => {
    try {
      // TODO
      // const resp = await axios.post('http://localhost:7542/2.0/auth/register', {
      //   email: values.email,
      //   password: values.password,
      // })
      // dispatch(setRegistered(true))
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

export const setRegistered = (value: boolean) => ({ type: 'AUTH/REGISTER', value } as const)

// types
type InitStateType = {
  isRegistered: boolean
}
type SignupActionType = ReturnType<typeof setRegistered>
export type SignupFormType = {
  email: string
  password: string
  confirmPassword: string
}
