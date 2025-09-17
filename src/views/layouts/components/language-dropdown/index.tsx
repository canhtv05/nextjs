import { Box, BoxProps, IconButton, Popover, styled, Typography } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from 'src/components/Icon'
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'

type TProps = {}

interface IBoxProps extends BoxProps {
  selected: boolean
}

const StyledItemLanguage = styled(Box)<IBoxProps>(({ theme, selected }) => ({
  cursor: 'pointer',
  '.MuiTypography-root': {
    padding: '8px 12px'
  },
  ...(!selected && {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  }),
  ...(selected && {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light
  })
}))

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
      <Popover
        id='language-dropdown'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        {LANGUAGE_OPTIONS.map(l => (
          <StyledItemLanguage
            selected={l.value === i18n.language}
            key={l.value}
            onClick={() => handleChangeLanguage(l.value as 'vi' | 'en')}
          >
            <Typography>{l.lang}</Typography>
          </StyledItemLanguage>
        ))}
      </Popover>
    </>
  )
}
export default LanguageDropDown
