import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI, SetNewPsswrdBodyType } from '../../app/api'
import { setAppError } from '../../app/app-reducer'

export const setNewPassword = (data: SetNewPsswrdBodyType) => async (dispatch: Dispatch) => {
  try {
    await authAPI.setNewPassword(data)
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
