'use client'

import { Avatar, Box, Button, FormHelperText, Grid, InputLabel } from '@mui/material'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG } from 'src/configs/regex'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Icon from 'src/components/Icon'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { useCallback, useEffect, useState } from 'react'
import { getAuthMe } from 'src/services/auth'
import { convertBase64, separationFullName, toFullName } from 'src/utils'
import { IconButton } from '@mui/material'
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { resetInitialState } from 'src/stores/apps/auth'
import { updateAuthMeAsync } from 'src/stores/apps/auth/actions'
import i18n from 'src/configs/i18n'
import Spinner from 'src/components/spinner'
import CustomSelect from 'src/components/custom-select'

type TProps = {}

type TDefaultValue = {
  email: string
  address: string
  city: string
  phoneNumber: string
  role: string
  fullName: string
}

const MyProfilePage: NextPage<TProps> = () => {
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState<string>('')
  const [roleId, setRoleId] = useState<string>('')

  const theme = useTheme()
  const { t } = useTranslation()

  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe } = useSelector(
    (state: RootState) => state.auth
  )

  const schema = yup
    .object({
      email: yup.string().required('Email is a required field').matches(EMAIL_REG, 'The field must be a valid email'),
      fullName: yup.string().required('Full name is a required field'),
      city: yup.string().notRequired(),
      address: yup.string().notRequired(),
      phoneNumber: yup.string().required('Phone number is a required field').min(8, 'The phone number is min 8 number'),
      role: yup.string().required('Role is a required field')
    })
    .required()

  const defaultValues: TDefaultValue = {
    email: '',
    address: '',
    city: '',
    phoneNumber: '',
    role: '',
    fullName: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const fetchGetAuthMe = async () => {
    setLoading(true)
    await getAuthMe()
      .then(async response => {
        setLoading(false)
        const data = response?.data
        if (data) {
          setRoleId(data?.role?._id)
          reset({
            email: data?.email,
            address: data?.address,
            city: data?.city,
            phoneNumber: data?.phoneNumber,
            role: data?.role?.name,
            fullName: toFullName(data?.lastName, data?.middleName, data?.firstName)
          })
          setAvatar(data?.avatar)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!messageUpdateMe) return
    if (isErrorUpdateMe) {
      toast.error(messageUpdateMe)
    } else if (isSuccessUpdateMe) {
      toast.success(messageUpdateMe)
      fetchGetAuthMe()
    }
    dispatch(resetInitialState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe, fetchGetAuthMe])

  useEffect(() => {
    fetchGetAuthMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  const onSubmit = useCallback(
    (data: any) => {
      const { firstName, lastName, middleName } = separationFullName(data?.fullName)

      dispatch(
        updateAuthMeAsync({
          email: data.email,
          firstName,
          lastName,
          middleName,
          role: roleId,
          phoneNumber: data.phoneNumber,
          address: data.address,
          avatar
        })
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [avatar]
  )

  const handleUploadAvatar = async (file: File) => {
    const base64 = await convertBase64(file)
    setAvatar(base64 as string)
  }

  return (
    <>
      {isLoading || (loading && <Spinner />)}
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
                    <Box sx={{ position: 'relative' }}>
                      {avatar && (
                        <IconButton
                          sx={{
                            position: 'absolute',
                            bottom: -4,
                            right: -6,
                            zIndex: 2,
                            color: theme.palette.error.main
                          }}
                          edge='start'
                          color='inherit'
                          onClick={() => setAvatar('')}
                        >
                          <Icon icon={'material-symbols-light:delete-outline'} />
                        </IconButton>
                      )}
                      {avatar ? (
                        <Avatar src={avatar} sx={{ width: 100, height: 100 }}>
                          <Avatar
                            sx={{
                              padding: '3px'
                            }}
                          />
                        </Avatar>
                      ) : (
                        <Avatar sx={{ width: 100, height: 100 }}>
                          <Avatar
                            sx={{
                              padding: '3px'
                            }}
                          />
                        </Avatar>
                      )}
                    </Box>
                    <WrapperFileUpload
                      uploadFunc={handleUploadAvatar}
                      objectAcceptFiles={{
                        'image/jpeg': ['.jpg', '.jpeg'],
                        'image/png': ['.png']
                      }}
                    >
                      <Button
                        type='submit'
                        variant='outlined'
                        color='primary'
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 'auto',
                          gap: '4px'
                        }}
                      >
                        <Icon icon={'lucide:camera'} />
                        {avatar ? t('change_avatar') : t('upload_avatar')}
                      </Button>
                    </WrapperFileUpload>
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
                        disabled
                        id='email'
                        label='Email'
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
                      <Box>
                        <InputLabel
                          sx={{
                            lineHeight: '15px',
                            mb: 1,
                            fontSize: '13px',
                            color: errors?.role
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main}, 0.42)`
                          }}
                        >
                          {t('role')}
                        </InputLabel>
                        <CustomSelect
                          options={[]}
                          value={value}
                          onChange={onChange}
                          fullWidth
                          id='role'
                          name='role'
                          error={Boolean(errors.role)}
                          placeholder={t('enter_your_role')}
                          onBlur={onBlur}
                        />
                        {errors?.email?.message && (
                          <FormHelperText
                            sx={{
                              color: !errors?.role
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
                            }}
                          >
                            {errors?.email?.message}
                          </FormHelperText>
                        )}
                      </Box>
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
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
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
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Box>
                        <InputLabel
                          sx={{
                            lineHeight: '15px',
                            mb: 1,
                            fontSize: '13px',
                            color: errors?.role
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main}, 0.42)`
                          }}
                        >
                          {t('city')}
                        </InputLabel>
                        <CustomSelect
                          options={[]}
                          value={value}
                          onChange={onChange}
                          fullWidth
                          id='city'
                          name='city'
                          error={Boolean(errors.city)}
                          placeholder={t('enter_your_city')}
                          onBlur={onBlur}
                        />
                        {errors?.city?.message && (
                          <FormHelperText
                            sx={{
                              color: !errors?.role
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
                            }}
                          >
                            {errors?.city?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
                    name='city'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        required
                        fullWidth
                        id='phoneNumber'
                        label={t('phone')}
                        name='phoneNumber'
                        autoComplete='phoneNumber'
                        onChange={e => {
                          const numValue = e.target.value.replace(/\D/g, '')
                          onChange(numValue)
                        }}
                        onBlur={onBlur}
                        value={value}
                        error={Boolean(errors.phoneNumber)}
                        placeholder={t('enter_your_phone')}
                        helperText={errors?.phoneNumber?.message}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]',
                          minLength: 8
                        }}
                      />
                    )}
                    name='phoneNumber'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
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
                        error={Boolean(errors.fullName)}
                        placeholder={t('enter_your_fullname')}
                        helperText={errors?.fullName?.message}
                      />
                    )}
                    name='fullName'
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
    </>
  )
}

export default MyProfilePage
