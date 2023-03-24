import { AppRootStateType } from '../../app/store'

export const cards = (state: AppRootStateType) => state.cards.cards
export const cardQuestion = (state: AppRootStateType) => state.cards.cardQuestion
export const packId = (state: AppRootStateType) => state.cards.cardsPack_id
export const sortCards = (state: AppRootStateType) => state.cards.sortCards
export const selectIsMyPack = (state: AppRootStateType) => state.cards.isMyPack
export const packNameForTitle = (state: AppRootStateType) => state.cards.packNameForTitle
