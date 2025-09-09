import * as React from 'react'
import { NextPage } from 'next'
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Icon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/layout'

type TProps = {}

const RecursiveListItems = ({ items, level }: { items: any[]; level: number }) => {
  const [open, setOpen] = React.useState<Record<string, boolean>>({})

  const handleClick = (key: string) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      {items.map(item => (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{ padding: `8px 10px 8px ${level * 10}px` }}
            onClick={item.children ? () => handleClick(item.title) : undefined}
          >
            <ListItemIcon>
              <Icon icon={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {Array.isArray(item.children) && item.children.length > 0 && (
              <>{!!open[item.title] ? <Icon icon={'lucide:chevron-down'} /> : <Icon icon={'lucide:chevron-up'} />}</>
            )}
          </ListItemButton>

          {Array.isArray(item.children) && item.children.length > 0 && (
            <Collapse in={!!open[item.title]} timeout='auto' unmountOnExit>
              <RecursiveListItems items={item.children} level={level + 1} />
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = () => {
  return (
    <Box sx={{ overflow: 'hidden', minHeight: '100vh' }}>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        <RecursiveListItems items={VerticalItems} level={1} />
      </List>
    </Box>
  )
}

export default ListVerticalLayout
