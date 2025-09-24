'use client'

import { Avatar, Box, Button, Grid } from '@mui/material'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

type TProps = {}

type TDefaultValue = {
  email: string
  password: string
  confirmPassword: string
}

const MyProfilePage: NextPage<TProps> = () => {
  const theme = useTheme()
  const { t } = useTranslation()

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
        .oneOf([yup.ref('password'), 'The confirm is must match with password'])
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

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(errors, data)
  }

  return (
    <Box component={'form'} autoComplete='off' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} noValidate>
      <Grid container spacing={5}>
        <Grid item sm={4} xs={12}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '15px',
              p: 4
            }}
          >
            <Grid container spacing={6}>
              <Grid item md={12} xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <Avatar sx={{ width: 100, height: 100 }}>
                    {/* {user?.avatar ? (
                        <Image
                          src={user?.avatar || ''}
                          alt='avatar'
                          style={{
                            width: 'auto',
                            height: 'auto'
                          }}
                        />
                      ) : ( */}
                    <Avatar
                      sx={{
                        padding: '3px'
                      }}
                    />
                    {/* )} */}
                  </Avatar>
                  <Button type='submit' variant='outlined' color='primary' sx={{ mt: 3, width: 'auto', mb: 2 }}>
                    Tải lên
                  </Button>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
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
                      placeholder={t('enter_your_email')}
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='email'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      id='role'
                      label={t('role')}
                      name='role'
                      disabled
                      autoComplete='role'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.role)}
                      placeholder={t('enter_your_role')}
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='role'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '15px',
              p: 4,
              height: '100%'
            }}
          >
            <Grid container spacing={5}>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      id='address'
                      label={t('address')}
                      name='address'
                      autoComplete='address'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.address)}
                      placeholder={t('enter_your_address')}
                      helperText={errors?.address?.message}
                    />
                  )}
                  name='address'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      id='city'
                      label={t('city')}
                      name='city'
                      autoComplete='city'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.city)}
                      placeholder={t('enter_your_city')}
                      helperText={errors?.city?.message}
                    />
                  )}
                  name='city'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      id='phone'
                      label={t('phone')}
                      name='phone'
                      autoComplete='phone'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.phone)}
                      placeholder={t('enter_your_phone')}
                      helperText={errors?.phone?.message}
                    />
                  )}
                  name='phone'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      id='fullname'
                      label={t('fullname')}
                      name='fullname'
                      autoComplete='fullname'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors.fullname)}
                      placeholder={t('enter_your_fullname')}
                      helperText={errors?.fullname?.message}
                    />
                  )}
                  name='fullname'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button type='submit' variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
          Thay đổi
        </Button>
      </Box>
    </Box>
  )
}

export default MyProfilePage
