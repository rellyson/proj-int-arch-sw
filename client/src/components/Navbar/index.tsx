import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
} from '@chakra-ui/react'
import { MdLogout } from 'react-icons/md'
import React, { FC, useEffect } from 'react'
import { logOut } from '../../services/auth'
import { UserInfo } from '../../services/user'

const NavBar: FC = () => {
  let userInfo: UserInfo = {
    sub: '1',
    email_verified: true,
    email: 'teste@teste.com',
    name: 'Juriscreide do nascimento',
  }
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {}, [])

  return (
    <Flex
      w="100%"
      h="5vh"
      bg="blackAlpha.300"
      shadow="md"
      direction="row"
      alignContent="space-between"
    >
      <Box w="35%"></Box>
      <Box w="62%"></Box>
      <Box w="3%" display="flex" flexDirection="row">
        <Menu>
          <MenuButton>
            <Avatar size="sm" name={userInfo.name} bg="blue.600" color="whiteAlpha.800" />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            >
              Modo {colorMode === 'light' ? 'escuro' : 'claro'}
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<MdLogout />}
              onClick={() => {
                logOut()
              }}
            >
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}
export default NavBar