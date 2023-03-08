import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { profileReducer } from '../features/Profile/profile-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  appReducer: appReducer,
  profileReducer: profileReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
