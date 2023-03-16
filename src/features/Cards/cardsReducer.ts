import { AppRootThunk } from '../../app/store'

import { cardsAPI, GetCardsPayloadType } from './cardsAPI'

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  maxGrade: 6,
  minGrade: 0,
  page: 1,
  pageCount: 0,
  packId: '',
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType) => {
  switch (action.type) {
    case 'CARDS/GET-CARDS':
      return { ...state, ...action.cards }
    case 'CARDS/SET-PACK-ID':
      return { ...state, packId: action.packId }
    default:
      return { ...state }
  }
}

//actions
export const cardsGetAC = (cards: CardsType) => ({ type: 'CARDS/GET-CARDS', cards } as const)
export const setPackIdAC = (packId: string) => ({ type: 'CARDS/SET-PACK-ID', packId } as const)

//thunk
export const getCardsTC = (): AppRootThunk => async (dispatch, getState) => {
  const cardsPack_id = getState().cards.packId

  try {
    const resp = await cardsAPI.getCards({ cardsPack_id })

    console.log(resp)
    dispatch(cardsGetAC(resp.data))
  } catch (e) {
    console.log(e)
  }
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
  packId: string
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
export type CardsSetUserIdActionType = ReturnType<typeof setPackIdAC>

export type CardsActionsType = CardsGetActionType | CardsSetUserIdActionType
