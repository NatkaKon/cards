import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { CardsActionsType, cardsReducer } from '../features/Cards/cardsReducer'
import { AuthActionsType, authReducer } from '../features/Login/authReducer'
import { PacksActionsType, packsReducer } from '../features/Packs/packsReducer'
import { ProfileActionsType, profileReducer } from '../features/Profile/profile-reducer'
import { SignupActionType, signupReducer } from '../features/Registration/sign-up-reducer'

import { AppActionType, appReducer } from './app-reducer'

const rootReducer = combineReducers({
  appReducer: appReducer,
  profile: profileReducer,
  auth: authReducer,
  signup: signupReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionType =
  | AppActionType
  | PacksActionsType
  | CardsActionsType
  | ProfileActionsType
  | AuthActionsType
  | SignupActionType

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, RootActionType>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
