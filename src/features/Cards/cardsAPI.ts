import { instance } from '../../app/api'

import { CardsType } from './cardsReducer'

export const cardsAPI = {
  getCards(data: GetCardsPayloadType) {
    return instance.get<CardsType>('cards/cars', { params: data })
  },
}

//types
export type GetCardsPayloadType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: number
  page?: number
  pageCount?: number
}
