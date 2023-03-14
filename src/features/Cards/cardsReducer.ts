import { Dispatch } from 'redux'

import { cardsAPI, GetCardsPayloadType } from './cardsAPI'

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  maxGrade: 6,
  minGrade: 0,
  page: 1,
  pageCount: 0,
  packUserId: '',
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType) => {
  switch (action.type) {
    case 'CARDS/GET-CARDS':
      return { ...state, ...action.cards }
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
type InitialStateType = typeof initialState

export type CardsType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
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
  answerImg?: string
  answerVideo?: string
  questionImg?: string
  questionVideo?: string
}

export type CardsGetActionType = ReturnType<typeof cardsGetAC>

export type CardsActionsType = CardsGetActionType
