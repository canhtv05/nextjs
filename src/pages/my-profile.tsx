import { NextPage } from 'next'
import { ReactNode } from 'react'
import BlankLayout from 'src/views/layouts/BlankLayout'
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const MyProfile: NextPage<TProps> = () => {
  return <RegisterPage />
}

export default MyProfile

// MyProfile.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
// MyProfile.guestGuard = true
