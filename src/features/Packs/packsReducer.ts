import { ThunkDispatch } from 'redux-thunk'

import { AppRootThunk } from '../../app/store'
import { setPaginationDataAC } from '../PagePagination/pagination-reducer'

import { AddNewPackType, packsAPI, UpdatePackType } from './packsAPI'

const initialState = {
  cardPacks: [] as CardPacksType[],
  maxCardsCount: 0,
  minCardsCount: 0,
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
      return state
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
  const { sortPacks, packName, isMyPack, min, max } = getState().packs
  const { page, pageCount } = getState().pagination
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

    dispatch(packsGetAC(resp.data))
    dispatch(
      setPaginationDataAC({
        page: resp.data.page,
        pageCount: resp.data.pageCount,
        totalPages: resp.data.cardPacksTotalCount,
      })
    )
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
  await packsAPI.deletePack(id)

  dispatch(getPacksTC())
}

export const updatePackTC =
  (data: UpdatePackType) => async (dispatch: ThunkDispatch<any, any, any>) => {
    //const data = { _id: packId, name: '😸 updatedCatsPack' }

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

export type SearchPacksByNameACType = ReturnType<typeof searchPacksByNameAC>
export type PacksActionsType =
  | ReturnType<typeof packsGetAC>
  | SearchPacksByNameACType
  | ReturnType<typeof searchMyPacksAC>
  | ReturnType<typeof searchPacksByCardsNumberAC>
  | ReturnType<typeof resetAllSortingParamsAC>
