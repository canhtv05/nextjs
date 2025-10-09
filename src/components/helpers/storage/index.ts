import { ACCESS_TOKEN, REFRESH_TOKEN, TEMPORARY_TOKEN, USER_DATA } from 'src/configs/auth'

export const setLocalUserData = (userData: string, accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    return {
      userData: window.localStorage.setItem(USER_DATA, userData),
      refreshToken: window.localStorage.setItem(REFRESH_TOKEN, refreshToken),
      accessToken: window.localStorage.setItem(ACCESS_TOKEN, accessToken)
    }
  }

  return {
    userData: '',
    refreshToken: '',
    accessToken: ''
  }
}

export const getLocalUserData = () => {
  if (typeof window !== 'undefined') {
    const userData = window.localStorage.getItem(USER_DATA)

    return {
      userData: userData ? JSON.parse(userData) : null,
      refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
      accessToken: window.localStorage.getItem(ACCESS_TOKEN)
    }
  }

  return {
    userData: '',
    refreshToken: '',
    accessToken: ''
  }
}

export const clearLocalUserData = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(USER_DATA)
    window.localStorage.removeItem(REFRESH_TOKEN)
    window.localStorage.removeItem(ACCESS_TOKEN)
  }
}

export const setTemporaryToken = (accessToken: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TEMPORARY_TOKEN, accessToken)
  }
}

export const getTemporaryToken = () => {
  if (typeof window !== 'undefined') {
    return { temporaryToken: window.localStorage.getItem(TEMPORARY_TOKEN) }
  }

  return {
    temporaryToken: ''
  }
}

export const clearTemporaryToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(TEMPORARY_TOKEN)
  }
}
