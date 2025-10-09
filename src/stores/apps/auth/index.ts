import { createSlice } from '@reduxjs/toolkit'
import { changeMyPasswordAsync, registerAuthAsync, updateAuthMeAsync } from './actions'

const initialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: '',
  isSuccessUpdateMe: true,
  isErrorUpdateMe: false,
  messageUpdateMe: '',
  isSuccessChangePassword: true,
  isErrorChangePassword: false,
  messageChangePassword: ''
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
      state.isSuccessUpdateMe = true
      state.isErrorUpdateMe = false
      state.messageUpdateMe = ''
      state.isSuccessChangePassword = true
      state.isErrorChangePassword = false
      state.messageChangePassword = ''
    }
  },
  extraReducers: builder => {
    // register
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

    //update me
    builder.addCase(updateAuthMeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateAuthMeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isErrorUpdateMe = !action?.payload?.data?.email
      state.isSuccessUpdateMe = !!action?.payload?.data?.email
      state.messageUpdateMe = action.payload.message
      state.typeError = action.payload.typeError
    })
    builder.addCase(updateAuthMeAsync.rejected, state => {
      state.isLoading = false
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = true
      state.messageUpdateMe = ''
      state.typeError = ''
    })

    // change password me
    builder.addCase(changeMyPasswordAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(changeMyPasswordAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isErrorChangePassword = !action?.payload?.data
      state.isSuccessChangePassword = !!action?.payload?.data
      state.messageChangePassword = action.payload.message
      state.typeError = action.payload.typeError
    })
    builder.addCase(changeMyPasswordAsync.rejected, state => {
      state.isLoading = false
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = true
      state.messageChangePassword = ''
      state.typeError = ''
    })
  }
})

export const { resetInitialState } = authSlice.actions
export default authSlice.reducer
