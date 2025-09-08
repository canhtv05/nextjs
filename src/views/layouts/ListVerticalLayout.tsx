import * as React from 'react'
import { NextPage } from 'next'
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Icon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/layout'

type TProps = {}

const ListVerticalLayout: NextPage<TProps> = () => {
  const [openChild, setOpenChild] = React.useState(true)

  const handleClick = () => {
    setOpenChild(prev => !prev)
  }

  return (
    <Box sx={{ overflow: 'hidden', minHeight: '100vh' }}>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        {VerticalItems.map(item => (
          <React.Fragment key={item.title}>
            <ListItemButton onClick={item.children && handleClick}>
              <ListItemIcon>
                <Icon icon={item.icon} />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
            {Array.isArray(item.children) &&
              item.children.length > 0 &&
              item.children.map(child => (
                <Collapse key={child.title} in={openChild} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <Icon icon={child.icon} />
                      </ListItemIcon>
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  </List>
                </Collapse>
              ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default ListVerticalLayout
