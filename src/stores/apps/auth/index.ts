import { createSlice } from '@reduxjs/toolkit'
import { registerAuthAsync } from './actions'

const initialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.message = ''
      state.typeError = ''
    }
  },
  extraReducers: builder => {
    builder.addCase(registerAuthAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = !action?.payload?.data?.email
      state.isSuccess = !!action?.payload?.data?.email
      state.message = action.payload.message
      state.typeError = action.payload.typeError
    })
    builder.addCase(registerAuthAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = action.payload?.message || ''
      state.typeError = action.payload?.typeError || ''
    })
  }
})

export const { resetInitialState } = authSlice.actions
export default authSlice.reducer
