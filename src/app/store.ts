import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { cardsReducer } from '../features/Cards/cardsReducer'
import { authReducer } from '../features/Login/authReducer'
import { packsReducer } from '../features/Packs/packsReducer'
import { profileReducer } from '../features/Profile/profile-reducer'
import { signupReducer } from '../features/Registration/sign-up-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  appReducer: appReducer,
  profileReducer: profileReducer,
  auth: authReducer,
  signup: signupReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
