import React, { FC } from 'react'

import { useAppSelector } from '../../app/store'
import { packNameForTitle, selectIsMyPack } from '../Cards/cards-selectors'
import { PanelButton } from '../PanelButton/PanelButton'

type PropsType = {
  onAddNewCardClick: () => void
}

export const CardNameAndButton: FC<PropsType> = props => {
  const isMyPack = useAppSelector(selectIsMyPack)

  const packName = useAppSelector(packNameForTitle)

  const handleAddNewCard = () => props.onAddNewCardClick()

  return (
    <>
      {isMyPack ? (
        <PanelButton button={'Add new card'} name={packName} callBack={handleAddNewCard} />
      ) : (
        <PanelButton button={'Learn to pack'} name={packName} callBack={() => {}} />
      )}
    </>
  )
}
