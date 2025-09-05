// ** Icon Imports
import { Icon as Icontify, IconProps } from '@iconify/react'

const Icon = ({ icon, ...rest }: IconProps) => {
  return <Icontify icon={icon} fontSize='1.375rem' {...rest} />
}

export default Icon
