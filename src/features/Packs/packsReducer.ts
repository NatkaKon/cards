import { Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { PayloadType } from './Packs'
import { AddNewPackType, GetPacksPayloadType, packsAPI } from './packsAPI'

const initialState = {
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
}

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType) => {
  switch (action.type) {
    case 'PACKS/GET-PACKS':
      return { ...action.packs }
    default:
      return { ...state }
  }
}

//actions
export const packsGetAC = (packs: PacksType) => ({ type: 'PACKS/GET-PACKS', packs } as const)

//thunk
export const getPacksTC = (data: GetPacksPayloadType) => (dispatch: Dispatch) => {
  packsAPI.getPacks(data).then(res => {
    dispatch(packsGetAC(res.data))
  })
}

export const addNewPackTC =
  (
    data: AddNewPackType = {
      name: 'New cats pack',
      private: false,
    }
  ) =>
  async (dispatch: ThunkDispatch<any, any, any>) => {
    await packsAPI.addNewPack(data)

    dispatch(getPacksTC(PayloadType))
  }

export const deletePackTC = (id: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
  await packsAPI.deleteNewPack(id)

  dispatch(getPacksTC(PayloadType))
}

export const editePackTC = (packId: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
  const data = { _id: packId, name: '😸 updatedCatsPack' }

  await packsAPI.updatePack(data)

  dispatch(getPacksTC(PayloadType))
}

// types
type InitialStateType = typeof initialState

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

export type PacksActionsType = PacksGetActionType
