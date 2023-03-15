import * as React from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/store'
import { PATH } from '../../common/constants/path'

import { loginTC } from './authReducer'
import s from './Login.module.css'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (values.password.length < 7) {
        errors.password = 'Password must be more than 7 characters...'
      } else if (!values.password) {
        errors.password = 'Required'
      }

      return errors
    },

    onSubmit: async values => {
      await dispatch(loginTC(values))
      navigate(PATH.PROFILE)
    },
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        height: '550px',
        justifyContent: 'space-around',
        margin: '100px',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper elevation={6} className={s.paper}>
          <div className={s.title}>Sign in</div>
          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="current-password"
            margin="normal"
            variant="standard"
            className={s.email}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          )}
          <FormControl sx={{ m: 1, width: '415px', display: 'flex', margin: 0 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="password"
              className={s.password}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            )}
          </FormControl>
          <FormControlLabel
            className={s.rememberMe}
            label={'Remember me'}
            control={<Checkbox />}
            checked={formik.values.rememberMe}
            {...formik.getFieldProps('rememberMe')}
          />
          <Link className={s.forgot} to={PATH.PASSWORD_RECOVERY}>
            Forgot Password?
          </Link>
          <Button type="submit" variant="contained" size="small">
            Sign In
          </Button>
          <div className={s.already}>Already have an account?</div>
          <Link to={PATH.REGISTRATION}>Sing Up</Link>
        </Paper>
      </form>
    </Box>
  )
}
