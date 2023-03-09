import { FC, useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { PATH } from '../../common/constants/path'

import { registerUser, SignupFormType } from './sign-up-reducer'
import style from './Signup.module.css'

export const Signup: FC = () => {
  const isRegistered = useAppSelector(state => state.signup.isRegistered)
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.appReducer.error)

  const paperFormStyle = { py: '20px', px: '30px', minWidth: '413px' }
  const buttonStyle = {
    borderRadius: '30px',
    mt: '20px',
    boxShadow: 6,
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email('Неверный email адрес').required('Введите почту'),
      password: Yup.string()
        .min(8, 'Длина должна быть более, чем 7 символов')
        .required('Введите пароль'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    }),

    onSubmit: (values: SignupFormType) => {
      dispatch(registerUser(values))
      formik.resetForm()
      formik.setSubmitting(false)
    },
  })

  if (isRegistered) return <Navigate to={PATH.LOGIN} />

  return (
    <div className={style.signupBlock}>
      <div className={style.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={6} sx={paperFormStyle}>
            <FormControl fullWidth margin="dense">
              <div className={style.formHeader}>Регистрация</div>
              <FormGroup>
                <TextField
                  id="email"
                  type="text"
                  variant="standard"
                  label="Email"
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={
                    formik.touched.email && formik.errors.email ? formik.errors.email : ' '
                  }
                />
                <TextField
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  variant="standard"
                  label="Пароль"
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={
                    formik.touched.password && formik.errors.password ? formik.errors.password : ' '
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  variant="standard"
                  label="Повторите пароль"
                  {...formik.getFieldProps('confirmPassword')}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : ' '
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowConfirmPassword}>
                          {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="medium"
                  disabled={formik.isSubmitting}
                  sx={buttonStyle}
                >
                  Зарегистрироваться
                </Button>
              </FormGroup>
            </FormControl>
            <div className={style.formFooter}>
              <div className={style.formEndnote}>Уже есть аккаунт?</div>
              <NavLink
                to={PATH.LOGIN}
                className={({ isActive }) =>
                  isActive ? style.activeLink + style.loginLink : style.loginLink
                }
              >
                Войти
              </NavLink>
            </div>
          </Paper>
        </form>
      </div>
      {error && <ErrorSnackbar />}
    </div>
  )
}
