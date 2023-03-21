import React, { FC } from 'react'

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../app/store'
import * as cardsSelectors from '../Cards/cards-selectors'
import * as profileSelectors from '../Profile/profile-selector'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { UpdateCardType } from '../Cards/cardsAPI'
import { deleteCardTC, updateCardTC } from '../Cards/cardsReducer'


export const TableBodyCards: FC = () => {
  const cards = useAppSelector(cardsSelectors.cards)
  const userId = useAppSelector(profileSelectors.userId)
  const cards = useAppSelector(state => state.cards)
  const isMyPack = useAppSelector(state => state.cards.isMyPack)
  const dispatch = useAppDispatch()
  const deleteCardHandler = (cardId: string) => dispatch(deleteCardTC(cardId))
  const editeCardHandler = (data: UpdateCardType) => dispatch(updateCardTC(data))

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
          <TableCell component="th" scope="row">
            {el.question}
          </TableCell>
          <TableCell align="right">{el.answer}</TableCell>
          <TableCell align="right">{el.updated.split('T')[0]}</TableCell>
          <TableCell align="right">{el.grade}</TableCell>
          {isMyPack && (
            <TableCell align="right">
              {
                <>
                  <EditIcon
                    onClick={() => {
                      editeCardHandler({ _id: el._id, question: '🐭question', answer: '🐹answer' })
                    }}
                  />
                  <DeleteForeverOutlinedIcon onClick={() => deleteCardHandler(el._id)} />
                </>
              }
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}
