import { AppRootThunk } from '../../app/store'

import { AddNewPackType, packsAPI } from './packsAPI'

const initialState = {
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  sortPacks: '',
  searchName: '',
  isMyPack: false,
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType) => {
  switch (action.type) {
    case 'PACKS/GET-PACKS':
      return { ...state, ...action.packs }
    case 'PACKS/SEARCH-PACKS-BY-NAME':
      return { ...state, searchName: action.searchName }
    case 'PACKS/SEARCH-MY-PACKS':
      return { ...state, isMyPack: action.isMyPacks }
    default:
      return { ...state }
  }
}

//actions
export const packsGetAC = (packs: PacksType) => ({ type: 'PACKS/GET-PACKS', packs } as const)
export const searchPacksByNameAC = (searchName: string) =>
  ({
    type: 'PACKS/SEARCH-PACKS-BY-NAME',
    searchName,
  } as const)
export const searchMyPacksAC = (isMyPacks: boolean) =>
  ({
    type: 'PACKS/SEARCH-MY-PACKS',
    isMyPacks,
  } as const)

//thunk
export const getPacksTC = (): AppRootThunk => async (dispatch, getState) => {
  const { sortPacks, searchName, isMyPack, minCardsCount, maxCardsCount, page, pageCount } =
    getState().packs
  let user_id = ''

  if (isMyPack) {
    user_id = getState().profileReducer._id
  }

  try {
    const resp = await packsAPI.getPacks({
      sortPacks,
      searchName,
      user_id,
      minCardsCount,
      maxCardsCount,
      page,
      pageCount,
    })

    console.log(resp.data)

    dispatch(packsGetAC(resp.data))
  } catch (e) {
    console.log(e)
  }
}

export const addNewPackTC =
  (
    data: AddNewPackType = {
      name: 'New cats pack',
      private: false,
    }
  ): AppRootThunk =>
  dispatch => {
    packsAPI.addNewPack(data).then(res => {
      getPacksTC()
      console.log(res)
    })
  }

// types

type PacksStateType = typeof initialState

export type PacksType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
}
type CardPacksType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
}

export type PacksGetActionType = ReturnType<typeof packsGetAC>
export type PacksActionsType =
  | PacksGetActionType
  | ReturnType<typeof searchPacksByNameAC>
  | ReturnType<typeof searchMyPacksAC>
