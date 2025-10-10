/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { NextPage } from 'next'
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  styled,
  Tooltip,
  useTheme
} from '@mui/material'
import Icon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/layout'
import { useRouter } from 'next/router'

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
  setActivePath: React.Dispatch<React.SetStateAction<string | null>>
  activePath: string | null
}

interface TListItemText extends ListItemTextProps {
  active: boolean
}

const StyledListItemText = styled(ListItemText)<TListItemText>(({ theme, active }) => ({
  '.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary': {
    textOverFlow: 'ellipsis',
    overFlow: 'hidden',
    display: 'block',
    width: '100%',
    color: active
      ? `${theme.palette.customColors.lightPaperBg} !important`
      : `rgba(${theme.palette.customColors.main}, 0.78)`,
    fontWeight: active ? 600 : 400
  }
}))

const RecursiveListItems: NextPage<TListItems> = ({
  items,
  level,
  disable,
  openItems,
  setOpenItems,
  activePath,
  setActivePath
}) => {
  const theme = useTheme()
  const router = useRouter()

  const handleClick = (key: string) => {
    if (!disable) setOpenItems(prev => ({ [key]: !openItems[key] }))
  }

  const handleSelectItem = (path: string) => {
    if (!path) return
    setActivePath(path)
    router.push(path)
  }

  return (
    <>
      {items?.map((item: any) => (
        <Box key={item.title} onClick={() => handleSelectItem(item?.path)}>
          <ListItemButton
            sx={{
              padding: `8px 10px 8px ${level * 10}px`,
              backgroundColor:
                (activePath && item?.path === activePath) || !!openItems[item?.title]
                  ? `${theme.palette.primary.main} !important`
                  : theme.palette.background.paper
            }}
            onClick={item.children ? () => handleClick(item.title) : undefined}
          >
            <ListItemIcon>
              <Icon
                icon={item.icon}
                style={{
                  color:
                    (activePath && item?.path === activePath) || !!openItems[item?.title]
                      ? `${theme.palette.customColors.lightPaperBg}`
                      : `rgba(${theme.palette.customColors.main}, 0.78)`
                }}
              />
            </ListItemIcon>
            <Divider />
            {!disable && (
              <Tooltip title={item.title}>
                <StyledListItemText
                  sx={{
                    color: '#fff !important'
                  }}
                  primary={item.title}
                  active={Boolean((activePath && item?.path === activePath) || !!openItems[item?.title])}
                />
              </Tooltip>
            )}
            {Array.isArray(item.children) && item.children.length > 0 && (
              <>
                {!!openItems[item.title] ? (
                  <Icon
                    icon={'lucide:chevron-down'}
                    style={{
                      color:
                        (activePath && item?.path === activePath) || !!openItems[item?.title]
                          ? `${theme.palette.customColors.lightPaperBg}`
                          : `rgba(${theme.palette.customColors.main}, 0.78)`
                    }}
                  />
                ) : (
                  <Icon
                    icon={'lucide:chevron-up'}
                    style={{
                      color:
                        (activePath && item?.path === activePath) || !!openItems[item?.title]
                          ? `${theme.palette.customColors.lightPaperBg}`
                          : `rgba(${theme.palette.customColors.main}, 0.78)`
                    }}
                  />
                )}
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
                setActivePath={setActivePath}
                activePath={activePath}
              />
            </Collapse>
          )}
        </Box>
      ))}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({})
  const [activePath, setActivePath] = React.useState<null | string>('')

  React.useEffect(() => {
    if (!open) setOpenItems({})
  }, [open])

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper'
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItems
        items={VerticalItems}
        level={1}
        disable={!open}
        openItems={openItems}
        setOpenItems={setOpenItems}
        setActivePath={setActivePath}
        activePath={activePath}
      />
    </List>
  )
}

export default ListVerticalLayout
