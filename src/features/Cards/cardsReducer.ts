import { Dispatch } from 'redux'

import { cardsAPI, GetCardsPayloadType } from './cardsAPI'

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 3,
  maxGrade: 4,
  minGrade: 2,
  page: 1,
  pageCount: 4,
  packUserId: '5eecf82a3ed8f700042f1186',
}

export const cardsReducer = (state = initialState, action: CardsGetActionType) => {
  switch (action.type) {
    case 'CARDS/GET-CARDS':
      return { ...state }
    default:
      return { ...state }
  }
}

//actions
export const cardsGetAC = (cards: CardsType) => ({ type: 'CARDS/GET-CARDS', cards } as const)

//thunk
export const getCardsTC = (data: GetCardsPayloadType) => (dispatch: Dispatch) => {
  cardsAPI.getCards(data).then(res => {
    console.log(res.data)
    dispatch(cardsGetAC(res.data))
  })
}

// types

export type CardsType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type CardsGetActionType = ReturnType<typeof cardsGetAC>
