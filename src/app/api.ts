import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data)
  },
  register(data: SignupParamsType) {
    return instance.post<SignupParamsType, AxiosResponse<ResponseType>>('auth/register', data)
  },
  forgot(data: ForgotRequestBodyType) {
    return instance.post<ForgotRequestBodyType, AxiosResponse<{ message: string }>>(
      'auth/forgot',
      data
    )
  },
  setNewPassword(data: SetNewPsswrdBodyType) {
    return instance.post<SetNewPsswrdBodyType, AxiosResponse<{ message: string }>>(
      '/auth/set-new-password',
      data
    )
  },
}

//types
export type ResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  avatar: string
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
export type SignupParamsType = {
  email: string
  password: string
}

export type ForgotRequestBodyType = {
  email: string
  from?: string
  message: string
}

export type SetNewPsswrdBodyType = {
  password: string
  resetPasswordToken: string
}
