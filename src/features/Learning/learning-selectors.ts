import { AppRootStateType } from '../../app/store'
export const packName = (state: AppRootStateType) => state.learn.packName
export const learningCards = (state: AppRootStateType) => state.learn.cards
export const cardsPack_id = (state: AppRootStateType) => state.learn.cardsPack_id
