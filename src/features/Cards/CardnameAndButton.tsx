import * as React from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { PanelButton } from '../PanelButton/PanelButton'

import { addNewCardTC } from './cardsReducer'

export const CardNameAndButton = () => {
  const isMyPack = useAppSelector(state => state.cards.isMyPack)
  const packId = useAppSelector(state => state.cards.cardsPack_id)
  const dispatch = useAppDispatch()

  const packNameForTitle = useAppSelector(state => state.cards.packNameForTitle)
  const addNewCardHandler = () => dispatch(addNewCardTC(packId))

  return (
    <>
      {isMyPack ? (
        <PanelButton button={'Add new card'} name={packNameForTitle} callBack={addNewCardHandler} />
      ) : (
        <PanelButton button={'Learn to pack'} name={packNameForTitle} callBack={() => {}} />
      )}
    </>
  )
}
