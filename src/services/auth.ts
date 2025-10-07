import axios from 'axios'
import instanceAxios from 'src/components/helpers/axios'
import { CONFIGS_API } from 'src/configs/api'
import { TLoginAuth, TRegisterAuth } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const res = await instanceAxios.post(`${CONFIGS_API.AUTH.INDEX}/login`, data)

    return res.data
  } catch (error) {
    return null
  }
}

export const logoutAuth = async () => {
  try {
    const res = await instanceAxios.post(`${CONFIGS_API.AUTH.INDEX}/logout`)

    return res.data
  } catch (error) {
    return null
  }
}

export const registerAuth = async (data: TRegisterAuth) => {
  const res = await axios.post(`${CONFIGS_API.AUTH.INDEX}/register`, data)

  return res.data
}

export const updateAuthMe = async (data: any) => {
  try {
    const res = await instanceAxios.put(`${CONFIGS_API.AUTH.INDEX}/me`, data)

    return res.data
  } catch (error) {
    return null
  }
}

export const getAuthMe = async () => {
  try {
    const res = await instanceAxios.get(`${CONFIGS_API.AUTH.AUTH_ME}`)

    return res.data
  } catch (error) {
    return null
  }
}
