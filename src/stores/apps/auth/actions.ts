import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerAuth, updateAuthMe } from 'src/services/auth'
import { TRegisterAuth } from 'src/types/auth'

interface IErrorPayload {
  message: string
  typeError: string
  data: any
}

export const registerAuthAsync = createAsyncThunk<any, TRegisterAuth, { rejectValue: IErrorPayload }>(
  'auth/register',
  async (data: TRegisterAuth, { rejectWithValue }) => {
    try {
      const response = await registerAuth(data)

      return response
    } catch (error: any) {
      return rejectWithValue({
        data: null,
        message: error.response?.data?.message || 'ERROR',
        typeError: error.response?.data?.typeError || 'ERROR'
      })
    }
  }
)

export const updateAuthMeAsync = createAsyncThunk('auth/update-me', async (data: any) => {
  const response = await updateAuthMe(data)

  if (response?.data) return response

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})
