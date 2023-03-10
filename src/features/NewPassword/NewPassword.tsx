import { FC, useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { FormLabel } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { buttonStyle } from '../../common/constants/form-button-style'
import style from '../../common/styles/authForm.module.css'

import { setNewPassword } from './new-password-thunk'

export const NewPassword: FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)

  const error = useAppSelector(state => state.appReducer.error)
  const dispatch = useAppDispatch()

  const { token } = useParams()

  const formik = useFormik({
    initialValues: {
      password: '',
    },

    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(8, 'Password must be more than 7 characters...')
        .required('Password is required'),
    }),

    onSubmit: (values: NewPasswordFormType) => {
      if (token) {
        dispatch(setNewPassword({ password: values.password, resetPasswordToken: token }))
        formik.resetForm()
        formik.setSubmitting(false)
      }
    },
  })

  const paperStyle = { py: '40px', px: '30px', maxWidth: '413px' }

  return (
    <div className={style.formBlock}>
      <div className={style.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={6} sx={paperStyle}>
            <FormControl fullWidth>
              <div className={style.formHeader}>Create new password</div>
              <FormGroup>
                <TextField
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  variant="standard"
                  label="Password"
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
                <FormLabel>
                  <p>Create new password and we will send you further instructions to email</p>
                </FormLabel>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="medium"
                  disabled={formik.isSubmitting}
                  sx={buttonStyle}
                >
                  Create new password
                </Button>
              </FormGroup>
            </FormControl>
          </Paper>
        </form>
      </div>
      {error && <ErrorSnackbar />}
    </div>
  )
}

type NewPasswordFormType = {
  password: string
}
