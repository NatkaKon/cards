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
    return instance.post<LoginParamsType, AxiosResponse<UserType>>('auth/login', data)
  },
  register(data: SignupParamsType) {
    return instance.post<SignupParamsType, AxiosResponse<UserType>>('auth/register', data)
  },
  changeUser(data: changeUserParamsType) {
    return instance.put<changeUserParamsType, AxiosResponse<changeUserResType>>('/auth/me', data)
  },
  logout() {
    return instance.delete<AxiosResponse<logoutResType>>('/auth/me')
  },
}

//types

export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string | null
  publicCardPacksCount: number // количество колод

  created: Date | null
  updated: Date | null
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string | null
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

export type changeUserParamsType = {
  name: string
  avatar?: string
}

export type changeUserResType = {
  updatedUser: UserType
  error?: string
}

export type logoutResType = {
  info: string
  error: string
}
