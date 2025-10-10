import { Box, Modal, ModalProps, styled } from '@mui/material'

interface TCustomModal extends ModalProps {
  handleClose: () => void
}

const StyledModal = styled(Modal)(() => ({
  zIndex: 1300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const CustomModal = ({ children, open, handleClose }: TCustomModal) => {
  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          height: '100%',
          width: '100vw',
          overflow: 'auto'
        }}
      >
        <Box sx={{ maxHeight: '100vh', overflow: 'auto' }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ margin: '40px 0' }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </StyledModal>
  )
}

export default CustomModal
