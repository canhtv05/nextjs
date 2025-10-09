/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
import { useAuth } from 'src/hooks/useAuth'
import { handleRedirectLogin } from '../helpers/axios'
import { clearTemporaryToken, getTemporaryToken } from '../helpers/storage'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const authContext = useAuth()
  const router = useRouter()

  useEffect(() => {
    const { temporaryToken } = getTemporaryToken()

    if (!router.isReady) return

    if (
      authContext.user === null &&
      !window.localStorage.getItem(ACCESS_TOKEN) &&
      !window.localStorage.getItem(USER_DATA) &&
      !temporaryToken
    ) {
      handleRedirectLogin(router, authContext.setUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  useEffect(() => {
    const handleUnLoad = () => {
      clearTemporaryToken()
    }

    window.addEventListener('beforeunload', handleUnLoad)

    return () => window.removeEventListener('beforeunload', handleUnLoad)
  }, [])

  if (authContext.loading || authContext.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
