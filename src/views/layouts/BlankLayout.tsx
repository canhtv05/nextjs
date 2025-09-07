import * as React from 'react'
import { styled } from '@mui/material/styles'
import { NextPage } from 'next'
import { Box, BoxProps } from '@mui/material'

type TProps = {
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh'
}))

const BlankLayout: NextPage<TProps> = ({ children }) => {
  return (
    <BlankLayoutWrapper>
      <Box sx={{ overflow: 'hidden', minHeight: '100vh' }}>{children}</Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
