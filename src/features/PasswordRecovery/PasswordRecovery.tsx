import { FC } from 'react'

import { FormLabel } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { buttonStyle } from '../../common/constants/form-button-style'
import { PATH } from '../../common/constants/path'
import style from '../../common/styles/authForm.module.css'

export const PasswordRecovery: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),

    onSubmit: (values: PasswordRecoveryFormType) => {
      alert(JSON.stringify(values))
    },
  })

  return (
    <div className={style.formBlock}>
      <div className={style.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={6} sx={{ py: '40px', px: '30px', maxWidth: '413px' }}>
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
  )
}

//types
type PasswordRecoveryFormType = {
  email: string
}
