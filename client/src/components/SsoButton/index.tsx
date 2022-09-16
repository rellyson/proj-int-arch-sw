import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import { MdLogin } from 'react-icons/md'
import config from '../../config'

const SsoButton: FC = () => {
  return (
    <Button
      onClick={() =>
        window.open(
          config.SSO_URL,
          'popup',
          `width=500,height=800,scrollbars=no,resizable=no,left=${
            (window.screen.width - 500) / 2
          },top=${(window.screen.height - 800) / 2}`,
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
