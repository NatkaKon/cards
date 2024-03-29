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
  deleteCard(id: string) {
    return instance.delete('/cards/card', { params: { id } })
  },
  updateCard(data: UpdateCardType) {
    return instance.put('/cards/card', { card: data })
  },
  gradeCard(data: GradeCardType) {
    return instance.put<UpdateCardType, RespGradeCard>('/cards/grade', data)
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
  sortCards?: string
  page?: number
  pageCount?: number
}
export type UpdateCardType = {
  _id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}
export type GradeCardType = {
  grade: number
  card_id: string
}
export type RespGradeCard = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
