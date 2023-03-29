import * as React from 'react'
import { useState } from 'react'

import { Container, Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useAppSelector } from '../../app/store'
import { ToPackListLink } from '../../common/components/ToPackListLink/ToPackListLink'
import * as learnSelector from '../Learning/learning-selectors'

import { Answer } from './Answer'

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
  const packName = useAppSelector(learnSelector.packName)
  const [learningMode, setLearningMode] = useState('question')

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
            <div>question</div>
          </Box>
          <Box sx={boxForAnswerCountStyle}>
            <div style={answersCountStyle}>количество ответов на вопрос: {'10'}</div>
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
            <Answer
              onClick={() => {
                setLearningMode('question')
              }}
            />
          )}
        </Paper>
      </Box>
    </Container>
  )
}
