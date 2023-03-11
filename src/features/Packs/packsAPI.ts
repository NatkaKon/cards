import { instance } from '../../app/api'

import { PacksType } from './packsReducer'

export const packsAPI = {
  getPacks(data: GetPacksPayloadType) {
    return instance.get<PacksType>('cards/pack', { params: data })
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
