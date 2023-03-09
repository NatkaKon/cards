type UserType = {
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
    case 'profile/SET-NEW-USER-NAME':
      return { ...state, name: action.name }
    default:
      return state
  }
}

export const setNewUserNameAC = (name: string) =>
  ({ type: 'profile/SET-NEW-USER-NAME', name } as const)

export type ProfileActionsType = ReturnType<typeof setNewUserNameAC>
