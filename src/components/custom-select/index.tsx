import { Box, InputLabel, InputLabelProps, MenuItem, MenuItemProps, Select, SelectProps, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'

type TCustomSelect = SelectProps & {
  options: { value: string; label: string }[]
}

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({}) => ({}))
const StyledSelect = styled(Select)<SelectProps>(() => ({
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    padding: '8px 8px 8px 10px',
    boxSizing: 'border-box',
    height: '40px'
  }
}))

const CustomPlaceHolder = styled(InputLabel)<InputLabelProps>(() => ({
  position: 'absolute',
  top: '8px',
  left: '10px',
  zIndex: 2
}))

const CustomSelect = (props: TCustomSelect) => {
  const { value, label, onChange, options, fullWidth, ...res } = props

  const { t } = useTranslation()

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {((Array.isArray(value) && !value.length) || !value) && <CustomPlaceHolder />}
      <StyledSelect
        {...res}
        fullWidth={fullWidth}
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={value}
        label={label}
        onChange={onChange}
      >
        {options?.length > 0 ? (
          options?.map(opt => (
            <StyledMenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </StyledMenuItem>
          ))
        ) : (
          <StyledMenuItem>{t('no_data')}</StyledMenuItem>
        )}
      </StyledSelect>
    </Box>
  )
}

export default CustomSelect
