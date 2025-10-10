import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material'
import { forwardRef, Ref } from 'react'

const StyledCustomGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  '& .MuiDataGrid-main': {
    border: `1px solid ${theme.palette.customColors.borderColor}`,
    borderRadius: '8px'
  }
}))

const CustomDataGrid = forwardRef((props: DataGridProps, ref: Ref<any>) => {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <StyledCustomGrid {...props} ref={ref} />
    </Paper>
  )
})

export default CustomDataGrid
