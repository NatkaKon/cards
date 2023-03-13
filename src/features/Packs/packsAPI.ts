import { AxiosResponse } from 'axios/index'

import { instance } from '../../app/api'

import { PacksType } from './packsReducer'

export const packsAPI = {
  getPacks(data: GetPacksPayloadType) {
    return instance.get<PacksType>('cards/pack', { params: data })
  },
  addNewPack(
    data: AddNewPackType = {
      name: 'no Name',
      private: false,
    }
  ) {
    return instance.post<AddNewPackType, AxiosResponse>('/cards/pack', data)
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
  name: string // если не отправить будет таким
  deckCover?: string // не обязателен
  private: boolean // если не отправить будет такой
}
