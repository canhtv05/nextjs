import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { BASE_URL, CONFIGS_API } from 'src/configs/api'
import {
  clearLocalUserData,
  clearTemporaryToken,
  getLocalUserData,
  getTemporaryToken,
  setLocalUserData,
  setTemporaryToken
} from '../storage'
import { jwtDecode } from 'jwt-decode'
import { FC, ReactNode } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { UserDataType } from 'src/contexts/types'
import { useAuth } from 'src/hooks/useAuth'

type TAxiosInterceptor = {
  children: ReactNode
}

const instanceAxios = axios.create({
  baseURL: BASE_URL
})

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath !== '/' && router.asPath !== '/login') {
    router.replace('/login', {
      query: { returnUrl: router.asPath }
    })
  } else router.replace('/login')
  setUser(null)
  clearLocalUserData()
  clearTemporaryToken()
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  const router = useRouter()
  const { setUser, user } = useAuth()
  instanceAxios.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const { accessToken, refreshToken } = getLocalUserData()
    const { temporaryToken } = getTemporaryToken()
    if (accessToken || temporaryToken) {
      let decodeAccessToken: any = {}
      if (accessToken) {
        decodeAccessToken = jwtDecode(accessToken)
      } else if (temporaryToken) {
        decodeAccessToken = jwtDecode(temporaryToken)
      }
      if (decodeAccessToken?.exp > Date.now() / 1000) {
        config.headers.Authorization = `Bearer ${accessToken ? accessToken : temporaryToken}`
      } else {
        if (refreshToken) {
          const decodeRefreshToken: any = jwtDecode(refreshToken)

          if (decodeRefreshToken?.exp > Date.now() / 1000) {
            await axios
              .post(
                `${CONFIGS_API.AUTH.INDEX}/refresh-token`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`
                  }
                }
              )
              .then(res => {
                const newAccessToken = res?.data?.data?.access_token
                if (newAccessToken) {
                  config.headers.Authorization = `Bearer ${newAccessToken}`
                  if (accessToken) {
                    setLocalUserData(JSON.stringify(user), newAccessToken, refreshToken)
                  } else {
                    setLocalUserData(JSON.stringify(user), '', refreshToken)
                    setTemporaryToken(newAccessToken)
                  }
                } else handleRedirectLogin(router, setUser)
              })
              .catch(() => handleRedirectLogin(router, setUser))
          } else {
            handleRedirectLogin(router, setUser)
          }
        } else {
          handleRedirectLogin(router, setUser)
        }
      }
    } else {
      handleRedirectLogin(router, setUser)
    }

    return config
  })

  return <>{children}</>
}

instanceAxios.interceptors.response.use((response: AxiosResponse) => {
  return response
})

export default instanceAxios
export { AxiosInterceptor, handleRedirectLogin }
