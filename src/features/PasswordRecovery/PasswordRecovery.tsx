import { FC, memo, useState } from 'react'

import { FormLabel } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ErrorSnackbar } from '../../common/components/ErrorSnackbar/ErrorSnackbar'
import { buttonStyle } from '../../common/constants/form-button-style'
import { PATH } from '../../common/constants/path'
import style from '../../common/styles/authForm.module.css'

import { ReactComponent as EmailPicture } from './email-image.svg'
import { sendResetPsswrdLink } from './psswrd-recovery-thunk'

const paperStyle = { py: '40px', px: '30px', maxWidth: '413px' }

export const PasswordRecovery: FC = memo(() => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),

    onSubmit: (values: PasswordRecoveryFormType) => {
      dispatch(sendResetPsswrdLink(values.email))
      setIsSubmitted(true)
      formik.setSubmitting(false)
    },
  })

  return (
    <>
      {isSubmitted ? (
        <CheckEmail email={formik.values.email} />
      ) : (
        <div className={style.formBlock}>
          <div className={style.formContainer}>
            <form onSubmit={formik.handleSubmit}>
              <Paper elevation={6} sx={paperStyle}>
                <FormControl fullWidth>
                  <div className={style.formHeader}>Forgot your password?</div>
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
                    <FormLabel>
                      <p>Enter your email address and we will send you further instructions</p>
                    </FormLabel>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="medium"
                      sx={buttonStyle}
                      disabled={formik.isSubmitting}
                    >
                      Send Instructions
                    </Button>
                  </FormGroup>
                  <div className={style.formFooter}>
                    <div className={style.formEndnote}>Did you remember your password?</div>
                    <NavLink
                      to={PATH.LOGIN}
                      className={({ isActive }) =>
                        isActive ? style.activeLink + style.loginLink : style.loginLink
                      }
                    >
                      Try logging in
                    </NavLink>
                  </div>
                </FormControl>
              </Paper>
            </form>
          </div>
        </div>
      )}
    </>
  )
})

export const CheckEmail: FC<{ email: string }> = memo(({ email }) => {
  const navigate = useNavigate()
  const error = useAppSelector(state => state.appReducer.error)

  const handleClick = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <div className={style.formBlock}>
      <div className={style.formContainer}>
        <Paper elevation={6} sx={paperStyle}>
          <div className={style.formHeader}>Check Email</div>
          <div>
            <EmailPicture />
          </div>
          <FormLabel>
            <p>
              We’ve sent an Email with instructions to <strong>{email}</strong>
            </p>
          </FormLabel>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            sx={buttonStyle}
            onClick={handleClick}
          >
            Back to login
          </Button>
        </Paper>
      </div>
      {error && <ErrorSnackbar />}
    </div>
  )
})

//types
type PasswordRecoveryFormType = {
  email: string
}
