import React, { FC } from 'react'

import { useAppSelector } from '../../app/store'
import { selectIsMyPack } from '../Cards/cards-selectors'
import { PanelButton } from '../PanelButton/PanelButton'

type PropsType = {
  onAddNewCardClick: () => void
}

export const CardNameAndButton: FC<PropsType> = props => {
  const isMyPack = useAppSelector(selectIsMyPack)

  const packNameForTitle = useAppSelector(state => state.cards.packNameForTitle)

  const handleAddNewCard = () => props.onAddNewCardClick()

  return (
    <>
      {isMyPack ? (
        <PanelButton button={'Add new card'} name={packNameForTitle} callBack={handleAddNewCard} />
      ) : (
        <PanelButton button={'Learn to pack'} name={packNameForTitle} callBack={() => {}} />
      )}
    </>
  )
}
