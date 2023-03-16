import { ThunkDispatch } from 'redux-thunk'

import { AppRootThunk } from '../../app/store'

import { AddNewPackType, packsAPI } from './packsAPI'

const initialState = {
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  sortPacks: '',
  packName: '',
  isMyPack: false,
  min: 0,
  max: 0,
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksActionsType) => {
  switch (action.type) {
    case 'PACKS/GET-PACKS':
      return { ...state, ...action.packs, max: action.packs.maxCardsCount }
    case 'PACKS/SEARCH-PACKS-BY-NAME':
      return { ...state, packName: action.packName }
    case 'PACKS/SEARCH-MY-PACKS':
      return { ...state, isMyPack: action.isMyPacks }
    case 'PACKS/SEARCH-BY-CARDS-NUMBER':
      return { ...state, min: action.values[0], max: action.values[1] }
    case 'PACKS/RESET-ALL-SORTING-PARAMS':
      return {
        ...state,
        min: 0,
        max: state.maxCardsCount,
        isMyPack: false,
        packName: '',
        sortPacks: '',
      }
    default:
      return { ...state }
  }
}

//actions
export const packsGetAC = (packs: PacksType) => ({ type: 'PACKS/GET-PACKS', packs } as const)
export const searchPacksByNameAC = (packName: string) =>
  ({
    type: 'PACKS/SEARCH-PACKS-BY-NAME',
    packName,
  } as const)
export const searchMyPacksAC = (isMyPacks: boolean) =>
  ({
    type: 'PACKS/SEARCH-MY-PACKS',
    isMyPacks,
  } as const)
export const searchPacksByCardsNumberAC = (values: number[]) =>
  ({
    type: 'PACKS/SEARCH-BY-CARDS-NUMBER',
    values,
  } as const)
export const resetAllSortingParamsAC = () =>
  ({
    type: 'PACKS/RESET-ALL-SORTING-PARAMS',
  } as const)

//thunk
export const getPacksTC = (): AppRootThunk => async (dispatch, getState) => {
  const { sortPacks, packName, isMyPack, min, max, page, pageCount } = getState().packs
  let user_id = ''

  if (isMyPack) {
    user_id = getState().profile._id
  }

  try {
    const resp = await packsAPI.getPacks({
      sortPacks,
      packName,
      user_id,
      min,
      max,
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
      name: 'NewCatsPack',
      private: false,
    }
  ) =>
  async (dispatch: ThunkDispatch<any, any, any>) => {
    await packsAPI.addNewPack(data)

    dispatch(getPacksTC())
  }

export const deletePackTC = (id: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
  await packsAPI.deleteNewPack(id)

  dispatch(getPacksTC())
}

export const editePackTC = (packId: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
  const data = { _id: packId, name: '😸 updatedCatsPack' }

  await packsAPI.updatePack(data)

  dispatch(getPacksTC())
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
  | ReturnType<typeof searchPacksByCardsNumberAC>
  | ReturnType<typeof resetAllSortingParamsAC>
