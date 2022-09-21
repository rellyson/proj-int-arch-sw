import { Box, Button, Center, Flex, Image, Stack, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import logo from '../../assets/logo.png'
import ColorModeToggle from '../../components/ColorModeToggle'
import config from '../../config'
import { MdLogin } from 'react-icons/md'

const SignIn: FC = () => {
  return (
    <>
      <Box position="absolute" right="1%" top="1%">
        <ColorModeToggle />
      </Box>
      <Center bg="blackAlpha.50" h="100vh" w="100%">
        <Flex
          py={8}
          bg="blackAlpha.100"
          borderWidth="2px"
          borderRadius="lg"
          borderColor="blackAlpha.300"
          padding={8}
          flexDirection="column"
          alignItems="center"
        >
          <Image src={logo} w={20} h={20} mb={1}></Image>
          <Text ml="2" fontWeight="semibold">
            Gerenciador de senhas
          </Text>
          <Stack spacing={2} mt="8">
            <Button
              onClick={() =>
                (window.location.href = `${config.IDP_URL}/protocol/openid-connect/auth?client_id=${config.IDP_CLIENT_ID}&redirect_uri=${config.IDP_REDIRECT_URI}&response_type=token&scope=profile&kc_locale=pt-BR`)
              }
              bg="blue.600"
              _active={{ bg: 'blue.700' }}
              _hover={{ bg: 'blue.700' }}
              color="whiteAlpha.900"
              leftIcon={<MdLogin />}
            >
              Entrar utilizando Single Sign-On
            </Button>
          </Stack>
        </Flex>
      </Center>
    </>
  )
}

export default SignIn
