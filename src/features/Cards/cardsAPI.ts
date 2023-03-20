import { instance } from '../../app/api'

import { CardsType } from './cardsReducer'

export const cardsAPI = {
  getCards(data: GetCardsPayloadType) {
    return instance.get<CardsType>(`cards/card`, {
      params: data,
    })
  },
  addNewCard(card: AddNewCardType) {
    return instance.post('/cards/card', { card })
  },
}

//types
export type AddNewCardType = {
  cardsPack_id: string
  question: string
  answer: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}
export type GetCardsPayloadType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  sortCards?: number
  page?: number
  pageCount?: number
}
