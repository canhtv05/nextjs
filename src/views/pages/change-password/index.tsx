'use client'

import { Box, Button, CssBaseline, IconButton, InputAdornment, Typography } from '@mui/material'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PASSWORD_REG } from 'src/configs/regex'
import { useEffect, useState } from 'react'
import Icon from 'src/components/Icon'
import Image from 'next/image'
import RegisterLight from '/public/images/register-light.png'
import RegisterDark from '/public/images/register-dark.png'
import { useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/apps/auth'
import { useTranslation } from 'react-i18next'
import { changeMyPasswordAsync } from 'src/stores/apps/auth/actions'
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}

type TDefaultValue = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

const ChangePasswordPage: NextPage<TProps> = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const { t } = useTranslation()
  const theme = useTheme()
  const { logout } = useAuth()

  const dispatch: AppDispatch = useDispatch()
  const { isErrorChangePassword, isLoading, isSuccessChangePassword, messageChangePassword } = useSelector(
    (s: RootState) => s.auth
  )

  const schema = yup
    .object({
      currentPassword: yup
        .string()
        .required('Current password is a required field')
        .matches(PASSWORD_REG, 'Current password must contain character, special character, number'),
      newPassword: yup
        .string()
        .required('New password is a required field')
        .matches(PASSWORD_REG, 'New password must contain character, special character, number'),
      confirmNewPassword: yup
        .string()
        .required('Confirm new password is a required field')
        .matches(PASSWORD_REG, 'Confirm new password must contain character, special character, number')
        .oneOf([yup.ref('newPassword')], 'The confirm must match with password')
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TDefaultValue>({
    defaultValues: {
      confirmNewPassword: '',
      currentPassword: '',
      newPassword: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
    if (!Object.keys(errors).length) {
      dispatch(changeMyPasswordAsync({ currentPassword, newPassword }))
    }
  }

  useEffect(() => {
    if (!messageChangePassword) return
    if (isErrorChangePassword) {
      toast.error(messageChangePassword)
    } else if (isSuccessChangePassword) {
      toast.success(messageChangePassword)
      setTimeout(() => logout(), 500)
    }
    dispatch(resetInitialState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorChangePassword, messageChangePassword, isSuccessChangePassword])

  return (
    <Box sx={{ height: '100%' }}>
      {isLoading && <FallbackSpinner />}
      <Box
        sx={{
          height: '100%',
          p: 5,
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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
              {t('change_password')}
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
                      type={showCurrentPassword ? 'text' : 'password'}
                      id='currentPassword'
                      label={t('current_password')}
                      name='currentPassword'
                      autoComplete='currentPassword'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.currentPassword)}
                      placeholder={t('enter_current_password')}
                      helperText={errors?.currentPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowCurrentPassword(prev => !prev)}>
                              {showCurrentPassword ? (
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
                  name='currentPassword'
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
                      name='newPassword'
                      label={t('new_password')}
                      type={showNewPassword ? 'text' : 'password'}
                      id='newPassword'
                      autoComplete='newPassword'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.newPassword)}
                      placeholder={t('enter_new_password')}
                      helperText={errors?.newPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowNewPassword(prev => !prev)}>
                              {showNewPassword ? (
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
                  name='newPassword'
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
                      name='confirmNewPassword'
                      label={t('confirm_new_password')}
                      type={showConfirmNewPassword ? 'text' : 'password'}
                      id='confirmNewPassword'
                      autoComplete='confirmNewPassword'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.confirmNewPassword)}
                      placeholder={t('enter_confirm_new_password')}
                      helperText={errors?.confirmNewPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowConfirmNewPassword(prev => !prev)}>
                              {showConfirmNewPassword ? (
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
                  name='confirmNewPassword'
                />
              </Box>
              <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
                {t('change_password')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChangePasswordPage
