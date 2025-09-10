import * as React from 'react'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { NextPage } from 'next'
import { Divider } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import ListVerticalLayout from './ListVerticalLayout'
import Icon from 'src/components/Icon'

const drawerWidth: number = 240

type TProps = {
  open: boolean
  toggleDrawer: () => void
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(12),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(12)
      }
    })
  }
}))

const VerticalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {
  return (
    <Drawer variant='permanent' open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <Icon icon={'mingcute:left-line'} />
        </IconButton>
      </Toolbar>
      <Divider />
      <ListVerticalLayout open={open} />
    </Drawer>
  )
}

export default VerticalLayout
