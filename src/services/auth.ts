import axios from 'axios'
import { CONFIGS_API } from 'src/configs/api'
import { TLoginAuth } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const res = await axios.post(CONFIGS_API.AUTH.INDEX, data)

    return res.data
  } catch (error) {
    return null
  }
}
