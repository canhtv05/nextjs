/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { NextPage } from 'next'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  styled,
  Tooltip
} from '@mui/material'
import Icon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/layout'

type TProps = {
  open: boolean
}

type TListItems = {
  level: number
  openItems: {
    [key: string]: boolean
  }
  items: any
  setOpenItems: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
  disable: boolean
}

const StyledListItemText = styled(ListItemText)<ListItemProps>(({ theme }) => ({
  '.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary': {
    textOverFlow: 'ellipsis',
    overFlow: 'hidden',
    display: 'block',
    width: '100%'
  }
}))

const RecursiveListItems: NextPage<TListItems> = ({ items, level, disable, openItems, setOpenItems }) => {
  const handleClick = (key: string) => {
    if (!disable) setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      {items?.map((item: any) => (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{ padding: `8px 10px 8px ${level * 10}px` }}
            onClick={item.children ? () => handleClick(item.title) : undefined}
          >
            <ListItemIcon>
              <Icon icon={item.icon} />
            </ListItemIcon>
            {!disable && (
              <Tooltip title={item.title}>
                <StyledListItemText primary={item.title} />
              </Tooltip>
            )}
            {Array.isArray(item.children) && item.children.length > 0 && (
              <>
                {!!openItems[item.title] ? <Icon icon={'lucide:chevron-down'} /> : <Icon icon={'lucide:chevron-up'} />}
              </>
            )}
          </ListItemButton>

          {Array.isArray(item.children) && item.children.length > 0 && (
            <Collapse in={!!openItems[item.title]} timeout='auto' unmountOnExit>
              <RecursiveListItems
                items={item.children}
                level={level + 1}
                disable={disable}
                openItems={openItems}
                setOpenItems={setOpenItems}
              />
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    if (!open) setOpenItems({})
  }, [open])

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItems
        items={VerticalItems}
        level={1}
        disable={!open}
        openItems={openItems}
        setOpenItems={setOpenItems}
      />
    </List>
  )
}

export default ListVerticalLayout
