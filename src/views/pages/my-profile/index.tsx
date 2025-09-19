'use client'

import { Avatar, Box, Button, Card, Grid } from '@mui/material'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useTheme } from '@mui/material'

type TProps = {}

type TDefaultValue = {
  email: string
  password: string
  confirmPassword: string
}

const MyProfilePage: NextPage<TProps> = () => {
  const theme = useTheme()

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
      <Box
        sx={{
          display: 'flex',
          gap: 5,
          flexDirection: {
            sm: 'row',
            xs: 'column'
          }
        }}
      >
        <Card
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
                    placeholder='Enter your email'
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
            </Grid>
          </Grid>
        </Card>
        <Card
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: '15px',
            p: 4
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
                    placeholder='Enter your email'
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
                    placeholder='Enter your email'
                    helperText={errors?.email?.message}
                  />
                )}
                name='email'
              />
            </Grid>
          </Grid>
        </Card>
      </Box>

      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button type='submit' variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
          Thay đổi
        </Button>
      </Box>
    </Box>
  )
}

export default MyProfilePage
