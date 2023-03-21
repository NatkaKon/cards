import { instance } from '../../app/api'

import { CardsType } from './cardsReducer'

export const cardsAPI = {
  getCards(data: GetCardsPayloadType) {
    return instance.get<CardsType>(`cards/card`, {
      params: data,
    })
  },
}

//types
export type GetCardsPayloadType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  sortCards?: string
  page?: number
  pageCount?: number
}
