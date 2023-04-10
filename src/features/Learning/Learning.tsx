import * as React from 'react'
import { useEffect, useState } from 'react'

import { Container, Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ToPackListLink } from '../../common/components/ToPackListLink/ToPackListLink'
import { PATH } from '../../common/constants/path'
import { getRandomCard } from '../../utils/utils'
import { CardType } from '../Cards/cardsReducer'
import * as learnSelector from '../Learning/learning-selectors'

import { Answer } from './Answer'
import { getLearnCardsTC, gradeCardTC } from './learnReducer'

const toPackListStyle = {
  width: '100%',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const buttonStyle = {
  width: '100%',
  height: '36px',
  borderRadius: '30px',
  boxShadow: 6,
}
const paperStyle = {
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '30px',
}
const answersCountStyle = {
  paddingRight: '10px',
  paddingBottom: '20px',
  color: 'grey',
  fontSize: 'small',
}
const containerStyle = { width: '70%' }
const titleStyle = { marginTop: '0px' }
const boxForPaperStyle = { display: 'flex', justifyContent: 'center' }
const boxForQuestionStyle = { display: 'flex', paddingBottom: '10px' }
const questionStyle = { fontWeight: 'bold', paddingRight: '10px' }
const boxForAnswerCountStyle = { display: 'flex' }

export const Learning = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(learnSelector.packName)
  const cardsPack_id = useAppSelector(learnSelector.cardsPack_id)
  const [learningMode, setLearningMode] = useState('question')
  const learningCards = useAppSelector(learnSelector.learningCards)
  const [card, setCard] = useState<CardType>(getRandomCard(learningCards))

  useEffect(() => {
    dispatch(getLearnCardsTC())
  }, [cardsPack_id])

  const onNext = (newGrade: number) => {
    setLearningMode('question')
    setCard(getRandomCard(learningCards))
    dispatch(gradeCardTC(newGrade, card._id))
  }

  useEffect(() => {
    setCard(getRandomCard(learningCards))
  }, [learningCards])

  if (learningCards.length === 0) return <Navigate to={PATH.PACKS} />

  return (
    <Container sx={containerStyle}>
      <Box sx={toPackListStyle}>
        <ToPackListLink />
      </Box>
      <h1 style={titleStyle}>Learn {packName}</h1>
      <Box sx={boxForPaperStyle}>
        <Paper elevation={3} sx={paperStyle}>
          <Box sx={boxForQuestionStyle}>
            <div style={questionStyle}>Question:</div>
            <div>{card.question}</div>
          </Box>
          <Box sx={boxForAnswerCountStyle}>
            <div style={answersCountStyle}>количество ответов на вопрос: {card.shots}</div>
          </Box>
          {learningMode === 'question' && (
            <Button
              onClick={() => {
                setLearningMode('answer')
              }}
              color="primary"
              variant="contained"
              size="medium"
              sx={buttonStyle}
            >
              Show answer
            </Button>
          )}
          {learningMode === 'answer' && (
            <Answer cardGrade={card.grade} onClick={onNext} answer={card.answer} />
          )}
        </Paper>
      </Box>
    </Container>
  )
}
