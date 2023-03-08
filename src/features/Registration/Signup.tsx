import { FC, useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

//import { AppRootStateType } from '../../app/store'
import { PATH } from '../../common/constants/path'

import { SignupFormType } from './sign-up-reducer'
import style from './Signup.module.css'

export const Signup: FC = () => {
  // const isRegistered = useAppSelector<AppRootStateType>(state => state.signup.isRegistered)
  //const dispatch = useAppDispatch();

  const paperFormStyle = { p: '33px', minWidth: '413px' }
  const buttonStyle = {
    borderRadius: '30px',
    mt: '60px',
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
        .min(7, 'Длина должна быть минимум 7 символов')
        .required('Введите пароль'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    }),

    onSubmit: (values: SignupFormType) => {
      // dispatch(registerUser(values))
      // formik.resetForm()
      // formik.setSubmitting(false)
    },
  })

  // if (isRegistered) return <Navigate to={PATH.LOGIN} />

  return (
    <div className={style.formContainer}>
      <Paper elevation={4} sx={paperFormStyle}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth margin="dense">
            <FormLabel>
              <h1>Регистрация</h1>
            </FormLabel>
            <FormGroup>
              <TextField
                id="email"
                type="text"
                variant="standard"
                label="Email"
                margin="dense"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ' '}
              />
              <TextField
                id="password"
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                label="Пароль"
                margin="dense"
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
                margin="dense"
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
        </form>
        <div className={style.formFooter}>
          <div>Уже есть аккаунт?</div>
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
    </div>
  )
}
