import { AppRootThunk } from '../../app/store'
import { cardsAPI } from '../Cards/cardsAPI'
import { CardType } from '../Cards/cardsReducer'

const initialState = {
  packName: '',
  cardsPack_id: '',
  cards: [] as Array<CardType>,
  learningCard: {
    answer: '',
    question: '',
    cardsPack_id: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
    _id: '',
    answerImg: '',
    answerVideo: '',
    questionImg: '',
    questionVideo: '',
  } as CardType,
}

export const learnReducer = (state: InitialStateType = initialState, action: LearnActionsType) => {
  switch (action.type) {
    case 'LEARN/SET-PACK-NAME':
      return { ...state, packName: action.packName }
    case 'LEARN/SET-LEARN-CARDS':
      return { ...state, cards: action.cards }
    case 'LEARN/SET-PACK-ID':
      return { ...state, cardsPack_id: action.cardsPack_id }
    case 'LEARN/SET-LEARNING-CARD':
      return { ...state, learningCard: action.card }
    default:
      return state
  }
}

//actions
export const setPackNameAC = (packName: string) =>
  ({ type: 'LEARN/SET-PACK-NAME', packName } as const)
export const setLearnCardsAC = (cards: Array<CardType>) =>
  ({ type: 'LEARN/SET-LEARN-CARDS', cards } as const)
export const setLearningPackIdAC = (cardsPack_id: string) =>
  ({ type: 'LEARN/SET-PACK-ID', cardsPack_id } as const)
export const setLearningCardAC = (card: CardType) =>
  ({ type: 'LEARN/SET-LEARNING-CARD', card } as const)

//thunks
export const getLearnCardsTC = (): AppRootThunk => async (dispatch, getState) => {
  try {
    const cardsPack_id = getState().learn.cardsPack_id
    const resp = await cardsAPI.getCards({ cardsPack_id })

    dispatch(setLearnCardsAC(resp.data.cards))
  } catch (e) {
    console.log(e)
  }
}
export const gradeCardTC =
  (grade: number, card_id: string): AppRootThunk =>
  async () => {
    try {
      await cardsAPI.gradeCard({ grade, card_id })
    } catch (e) {
      console.log(e)
    }
  }

// types
type InitialStateType = typeof initialState
export type LearnActionsType =
  | ReturnType<typeof setPackNameAC>
  | ReturnType<typeof setLearnCardsAC>
  | ReturnType<typeof setLearningPackIdAC>
  | ReturnType<typeof setLearningCardAC>
