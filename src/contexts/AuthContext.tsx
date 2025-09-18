// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { loginAuth, logoutAuth } from 'src/services/auth'
import { CONFIGS_API } from 'src/configs/api'
import { clearLocalUserData, setLocalUserData } from 'src/components/helpers/storage'
import { ACCESS_TOKEN } from 'src/configs/auth'
import instanceAxios from 'src/components/helpers/axios'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(ACCESS_TOKEN)!
      if (storedToken) {
        setLoading(true)
        await instanceAxios
          .get(CONFIGS_API.AUTH.AUTH_ME)
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.data })
          })
          .catch(() => {
            clearLocalUserData()
            setUser(null)
            setLoading(false)
            if (!router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoading(true)
    loginAuth({ password: params.password, email: params.email })
      .then(async response => {
        setLoading(false)
        params.rememberMe
          ? setLocalUserData(response.data.user, response.data.access_token, response.data.refresh_token)
          : null
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.user })

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        setLoading(false)
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }

  const handleLogout = async () => {
    logoutAuth().then(() => {
      setUser(null)
      clearLocalUserData()
      router.push('/login')
    })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
