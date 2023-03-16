import { instance } from '../../app/api'

import { PacksType } from './packsReducer'

export const packsAPI = {
  getPacks(data: GetPacksPayloadType) {
    return instance.get<PacksType>(`cards/pack`, { params: data })
  },
  addNewPack(cardsPack: AddNewPackType) {
    return instance.post('/cards/pack', { cardsPack })
  },
  deleteNewPack(id: string) {
    return instance.delete('/cards/pack', { params: { id } })
  },
  updatePack(data: UpdatePackType) {
    return instance.put('/cards/pack', { cardsPack: data })
  },
}

//types
export type GetPacksPayloadType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string // чьи колоды не обязательно, или придут все
  block?: boolean
}

export type AddNewPackType = {
  name?: string
  deckCover?: string
  private?: boolean
}

export type UpdatePackType = {
  _id: string
  name?: string
}
