import { AppRootStateType } from '../../app/store'

export const packs = (state: AppRootStateType) => state.packs.cardPacks
export const packName = (state: AppRootStateType) => state.packs.packName
export const isMyPack = (state: AppRootStateType) => state.packs.isMyPack
export const min = (state: AppRootStateType) => state.packs.min
export const max = (state: AppRootStateType) => state.packs.max
export const sortPacks = (state: AppRootStateType) => state.packs.sortPacks
