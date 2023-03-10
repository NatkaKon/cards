import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI, ForgotRequestBodyType } from '../../app/api'
import { setAppError } from '../../app/app-reducer'
import { PATH } from '../../common/constants/path'

export const sendResetPsswrdLink = (email: string) => async (dispatch: Dispatch) => {
  const link = `https://natkakon.github.io/cards/#/${PATH.NEW_PASSWORD}/$token$`
  const letterBody: ForgotRequestBodyType = {
    email,
    from: `test-front-admin <ai73a@yandex.by>`,
    message: `<div style="background-color: #2F4F4F; padding: 10px; font-size: 20px"><a href={link} target="_blank" rel=" noopener noreferrer">Click here to reset your password</a></div>`,
  }

  try {
    await authAPI.forgot(letterBody)
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
