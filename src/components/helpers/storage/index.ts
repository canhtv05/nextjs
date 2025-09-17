import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from 'src/configs/auth'

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
    return {
      userData: window.localStorage.getItem(USER_DATA),
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
