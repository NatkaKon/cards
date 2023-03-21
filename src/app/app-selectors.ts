import { AppRootStateType } from './store'

export const isInitialized = (state: AppRootStateType) => state.appReducer.isInitialized
export const error = (state: AppRootStateType) => state.appReducer.error
