import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerAuth } from 'src/services/auth'
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
