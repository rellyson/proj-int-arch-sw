import { Button, Link } from '@chakra-ui/react'
import React, { FC } from 'react'
import { MdLogin } from 'react-icons/md'
import config from '../../config'

interface SsoButtonProps {
  width: number
  height: number
  left: number
  top: number
}

const SsoButton: FC<SsoButtonProps> = (props: SsoButtonProps) => {
  return (
    <Button
      onClick={() =>
        window.open(
          config.IDP_SIGNUP_LINK,
          'popup',
          `width=${props.width},height=${props.height},scrollbars=no,resizable=no,left=${props.left},top=${props.top}`,
        )
      }
      bg="blue.600"
      _active={{ bg: 'blue.700' }}
      _hover={{ bg: 'blue.700' }}
      color="whiteAlpha.900"
      leftIcon={<MdLogin />}
      w={60}
    >
      Entrar com Single Sign-On
    </Button>
  )
}
export default SsoButton
