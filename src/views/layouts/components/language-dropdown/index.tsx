import { IconButton, Menu, MenuItem } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from 'src/components/Icon'
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'

type TProps = {}

const LanguageDropDown: NextPage<TProps> = () => {
  const { i18n } = useTranslation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeLanguage = (lang: 'vi' | 'en') => {
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <IconButton color='inherit' onClick={handleOpen}>
        <Icon icon={'lucide:languages'} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LANGUAGE_OPTIONS.map(l => (
          <MenuItem
            selected={l.value === i18n.language}
            key={l.value}
            onClick={() => handleChangeLanguage(l.value as 'vi' | 'en')}
          >
            {l.lang}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
export default LanguageDropDown
