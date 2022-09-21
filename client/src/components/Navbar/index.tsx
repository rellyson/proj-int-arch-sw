import { ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
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
  Image,
  Text,
} from '@chakra-ui/react'
import { MdLogout, MdManageAccounts } from 'react-icons/md'
import React, { FC, useEffect } from 'react'
import { getTokenInfo, logOut } from '../../services/auth'
import logo from '../../assets/logo.png'
import config from '../../config'
import { useInfo } from '../../contexts/user-context'

const NavBar: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const info = useInfo()

  useEffect(() => {
    const getUserTokenInfo = async () => {
      return getTokenInfo()
    }

    getUserTokenInfo().then((tokenInfo) => {
      info?.userInfoUpdater(tokenInfo)
    })
  }, [])

  const showPreferences = () => {
    window.open(`${config.IDP_URL}/account/#/personal-info`, '_blank')
  }

  return (
    <Flex
      w="100%"
      h="5vh"
      bg="blackAlpha.300"
      shadow="md"
      direction="row"
      alignContent="space-between"
    >
      <Box w="35%" display="flex" flexDirection="row">
        <Image ml="4" pt="1" src={logo} w={12}></Image>
        <Text ml="2" fontWeight="semibold" pt="4">
          Gerenciador de senhas
        </Text>
      </Box>
      <Box w="62%"></Box>
      <Box w="3%" display="flex" flexDirection="row">
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              name={info?.userInfo.name}
              bg="blue.600"
              color="whiteAlpha.800"
            />
          </MenuButton>
          <MenuList>
            <Text ml="3" fontWeight="bold">
              {info?.userInfo.name}
            </Text>
            <Text ml="3">{info?.userInfo.email}</Text>

            <MenuDivider />
            <MenuItem
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            >
              Modo {colorMode === 'light' ? 'escuro' : 'claro'}
            </MenuItem>
            <MenuItem
              onClick={() => {
                showPreferences()
              }}
              icon={<MdManageAccounts size="16" />}
            >
              Preferências da conta <ExternalLinkIcon ml="2px" />
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
