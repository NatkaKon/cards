import React, { FC } from 'react'

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../app/store'
import * as cardsSelectors from '../Cards/cards-selectors'
import { selectIsMyPack } from '../Cards/cards-selectors'
import { deleteCardTC } from '../Cards/cardsReducer'

type PropsType = {
  handleClickOnOpenEditCard: (cardId: string, cardQuestion: string, cardAnswer: string) => void
}

export const TableBodyCards: FC<PropsType> = props => {
  const cards = useAppSelector(cardsSelectors.cards)
  const isMyPack = useAppSelector(selectIsMyPack)

  const dispatch = useAppDispatch()

  const deleteCardHandler = (cardId: string) => dispatch(deleteCardTC(cardId))

  const handleClickOnOpenEditPack = (cardId: string, cardQuestion: string, cardAnswer: string) => {
    props.handleClickOnOpenEditCard(cardId, cardQuestion, cardAnswer)
  }

  return (
    <TableBody>
      {cards.map(el => (
        <TableRow
          key={el._id}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            '&:hover': {
              backgroundColor: '#A0A0A0',
              opacity: [0.9, 0.9, 0.7],
            },
          }}
        >
          <TableCell component="td" scope="row">
            {el.question}
          </TableCell>
          <TableCell align="right">{el.answer}</TableCell>
          <TableCell align="right">{el.updated.split('T')[0]}</TableCell>
          <TableCell align="right">{el.grade}</TableCell>
          {isMyPack && (
            <TableCell align="right">
              {
                <>
                  <IconButton
                    onClick={() => handleClickOnOpenEditPack(el._id, el.question, el.answer)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteCardHandler(el._id)}>
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                </>
              }
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}
