'use client'

import { Box, Button, CssBaseline, Divider, Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useEffect, useState } from 'react'
import Icon from 'src/components/Icon'
import Image from 'next/image'
import RegisterLight from '/public/images/register-light.png'
import RegisterDark from '/public/images/register-dark.png'
import { useTheme } from '@mui/material'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { registerAuthAsync } from 'src/stores/apps/auth/actions'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/apps/auth'
import { useRouter } from 'next/router'
import { ROUTES_CONFIG } from 'src/configs/routes'

type TProps = {}

type TDefaultValue = {
  email: string
  password: string
  confirmPassword: string
}

const RegisterPage: NextPage<TProps> = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()

  const theme = useTheme()

  const dispatch: AppDispatch = useDispatch()
  const { isError, isLoading, isSuccess, message } = useSelector((s: RootState) => s.auth)

  const schema = yup
    .object({
      email: yup.string().required('Email is a required field').matches(EMAIL_REG, 'The field must be a valid email'),
      password: yup
        .string()
        .required('Password is a required field')
        .matches(PASSWORD_REG, 'Password must contain character, special character, number'),
      confirmPassword: yup
        .string()
        .required('Confirm password is a required field')
        .matches(PASSWORD_REG, 'Password must contain character, special character, number')
        .oneOf([yup.ref('password')], 'The confirm is must match with password')
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TDefaultValue>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = ({ email, password }: { email: string; password: string }) => {
    if (!Object.keys(errors).length) {
      dispatch(registerAuthAsync({ email, password }))
    }
  }

  useEffect(() => {
    if (!message) return
    if (isError) {
      toast.error(message)
    } else if (isSuccess) {
      toast.success(message)
      router.push(ROUTES_CONFIG.SIGN_IN)
    }
    dispatch(resetInitialState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, isSuccess])

  return (
    <>
      {isLoading && <FallbackSpinner />}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <Box
          display={{
            xs: 'none',
            sm: 'flex'
          }}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            backgroundColor: theme.palette.customColors.bodyBg,
            height: '100%',
            minWidth: '50vw'
          }}
        >
          <Image
            src={theme.palette.mode === 'light' ? RegisterLight : RegisterDark}
            alt='register image'
            style={{
              height: 'auto',
              width: 'auto'
            }}
            priority
          ></Image>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component='h1' variant='h5'>
              Register
            </Typography>
            <Box component={'form'} autoComplete='off' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} noValidate>
              <Box sx={{ mt: 2, width: '300px' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.email)}
                      placeholder='Enter your email'
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='email'
                />
              </Box>
              <Box sx={{ mt: 2, width: '300px' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      autoComplete='current-password'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.password)}
                      placeholder='Enter your password'
                      helperText={errors?.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowPassword(prev => !prev)}>
                              {showPassword ? (
                                <Icon icon={'material-symbols:visibility-outline-rounded'} />
                              ) : (
                                <Icon icon={'ic:baseline-visibility-off'} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='password'
                />
              </Box>
              <Box sx={{ mt: 2, width: '300px' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      name='confirm-password'
                      label='Confirm password'
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirm-password'
                      autoComplete='current-confirm-password'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.confirmPassword)}
                      placeholder='Confirm your password'
                      helperText={errors?.confirmPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowConfirmPassword(prev => !prev)}>
                              {showConfirmPassword ? (
                                <Icon icon={'material-symbols:visibility-outline-rounded'} />
                              ) : (
                                <Icon icon={'ic:baseline-visibility-off'} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='confirmPassword'
                />
              </Box>
              <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
                Sign up
              </Button>
              <Grid container justifyContent={'center'} alignItems={'center'} spacing={2}>
                <Grid item>{'Do you have already account?'}</Grid>
                <Grid item>
                  <Link
                    style={{
                      color: theme.palette.primary.main
                    }}
                    href='/login'
                  >
                    {'Sign in'}
                  </Link>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }}>
                <Typography variant='body2' sx={{ textAlign: 'center' }}>
                  Or
                </Typography>
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <IconButton sx={{ color: theme.palette.info.main }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    fontSize='1.375rem'
                    className='iconify iconify--mdi'
                    width='1em'
                    height='1em'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
                    />
                  </svg>
                </IconButton>
                <IconButton sx={{ color: theme.palette.error.main }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    fontSize='1.375rem'
                    className='iconify iconify--mdi'
                    width='1em'
                    height='1em'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z'
                    />
                  </svg>
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default RegisterPage
