// ** MUI Imports
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'
import { Modal, ModalProps } from '@mui/material'
import CircularWithValueLabel from '../custom-circular-process'

const CustomModal = styled(Modal)<ModalProps>(({ theme }) => ({
  '&.MuiModal-root': {
    width: '100%',
    height: '100%',
    zIndex: 2000,
    '.MuiModal-backdrop': {
      backgroundColor: `rgba(${theme.palette.customColors.main}, 0.3)`
    }
  }
}))

const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  return (
    <CustomModal
      open
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <>
        <CircularWithValueLabel />
      </>
    </CustomModal>
  )
}

export default Spinner
