import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { CardsActionsType, cardsReducer } from '../features/Cards/cardsReducer'
import { LearnActionsType, learnReducer } from '../features/Learning/learnReducer'
import { AuthActionsType, authReducer } from '../features/Login/authReducer'
import { PacksActionsType, packsReducer } from '../features/Packs/packsReducer'
import {
  PaginationActionsType,
  paginationReducer,
} from '../features/PagePagination/pagination-reducer'
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
  pagination: paginationReducer,
  learn: learnReducer,
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
  | PaginationActionsType
  | LearnActionsType

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, RootActionType>

export type AppRootThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  RootActionType
>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
