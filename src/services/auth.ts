import instanceAxios from 'src/components/helpers/axios'
import { CONFIGS_API } from 'src/configs/api'
import { TLoginAuth } from 'src/types/auth'

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
