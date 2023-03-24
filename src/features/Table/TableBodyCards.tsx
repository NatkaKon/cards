import React, { FC, memo } from 'react'

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../app/store'
import { selectIsMyPack } from '../Cards/cards-selectors'
import { CardType } from '../Cards/cardsReducer'

type PropsType = {
  cards: CardType[]
  handleOpenEditCard: (cardId: string, cardQuestion: string, cardAnswer: string) => void
  handleOpenDeletePack: (cardId: string, question: string) => void
}

export const TableBodyCards: FC<PropsType> = memo(props => {
  const isMyPack = useAppSelector(selectIsMyPack)

  const deleteCardHandler = (cardId: string, question: string) =>
    props.handleOpenDeletePack(cardId, question)

  const handleOpenEditCard = (cardId: string, cardQuestion: string, cardAnswer: string) =>
    props.handleOpenEditCard(cardId, cardQuestion, cardAnswer)

  return (
    <TableBody>
      {props.cards.map(el => (
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
                  <IconButton onClick={() => handleOpenEditCard(el._id, el.question, el.answer)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteCardHandler(el._id, el.question)}>
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
})
