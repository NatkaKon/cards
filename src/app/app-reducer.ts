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
    default:
      return state
  }
}

export const setAppError = (error: AppErrorType) => ({ type: 'APP/SET-ERROR', error } as const)

type AppActionType = ReturnType<typeof setAppError>
type AppErrorType = string | null
type initialStateType = {
  status: 'loading'
  error: AppErrorType
  isInitialized: boolean
}
