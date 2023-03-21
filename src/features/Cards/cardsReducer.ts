import { AppRootThunk } from '../../app/store'
import { setPaginationDataAC } from '../PagePagination/pagination-reducer'

import { cardsAPI } from './cardsAPI'

const initialState = {
  cards: [] as CardType[],
  maxGrade: 6,
  minGrade: 0,
  cardsPack_id: '',
  cardQuestion: '',
  packName: '',
  sortCards: '0updated',
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType) => {
  switch (action.type) {
    case 'CARDS/GET-CARDS':
      return { ...state, ...action.cards }
    case 'CARDS/SET-PACK-ID':
      return { ...state, cardsPack_id: action.packId }
    case 'CARDS/SEARCH-CARDS-BY-QUESTION':
      return { ...state, cardQuestion: action.cardQuestion }
    case 'CARDS/SET-SORT-CARDS':
      return { ...state, sortCards: action.newSort }
    case 'CARDS/RESET-ALL-SORTING-PARAMS':
      return { ...state, cardQuestion: '', sortCards: '0updated' }
    default:
      return state
  }
}

//actions
export const cardsGetAC = (cards: CardsType) => ({ type: 'CARDS/GET-CARDS', cards } as const)
export const setPackIdAC = (packId: string) => ({ type: 'CARDS/SET-PACK-ID', packId } as const)
export const searchCardsByQuestionAC = (cardQuestion: string) =>
  ({
    type: 'CARDS/SEARCH-CARDS-BY-QUESTION',
    cardQuestion,
  } as const)
export const setSortCardsAC = (newSort: string) =>
  ({
    type: 'CARDS/SET-SORT-CARDS',
    newSort,
  } as const)
export const resetCardsSortingParamsAC = () =>
  ({
    type: 'CARDS/RESET-ALL-SORTING-PARAMS',
  } as const)

//thunk
export const getCardsTC = (): AppRootThunk => async (dispatch, getState) => {
  const { cardsPack_id, cardQuestion, sortCards } = getState().cards
  const { page, pageCount } = getState().pagination

  try {
    const resp = await cardsAPI.getCards({ cardsPack_id, page, pageCount, cardQuestion, sortCards })

    console.log(resp.data)
    dispatch(cardsGetAC(resp.data))
    dispatch(
      setPaginationDataAC({
        page: resp.data.page,
        pageCount: resp.data.pageCount,
        totalPages: resp.data.cardsTotalCount,
      })
    )
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
  packName: string
}

export type CardType = {
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

export type CardsActionsType =
  | ReturnType<typeof cardsGetAC>
  | ReturnType<typeof setPackIdAC>
  | ReturnType<typeof searchCardsByQuestionAC>
  | ReturnType<typeof resetCardsSortingParamsAC>
  | ReturnType<typeof setSortCardsAC>
