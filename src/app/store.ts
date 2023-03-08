import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'

import { signupReducer } from '../features/Registration/sign-up-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  appReducer: appReducer,
  signup: signupReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
