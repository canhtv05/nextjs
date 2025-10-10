import { NextPage } from 'next'
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const ManageSystem: NextPage<TProps> = () => {
  return <RegisterPage />
}

export default ManageSystem

// ManageSystem.getLayout = (page: ReactNode) => <>{page}</>
// ManageSystem.guestGuard = true
