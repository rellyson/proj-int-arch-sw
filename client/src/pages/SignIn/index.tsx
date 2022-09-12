import {
  Box,
  Button,
  Center,
  Image,
  Input,
  Stack,
  Link,
  useToast,
} from '@chakra-ui/react'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import ColorModeToggle from '../../components/ColorModeToggle'
import { authenticate } from '../../services/auth'

const SignIn: FC = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async () => {
    setLoading(true)
    await authenticate(email, password)
      .then(() => {
        setLoading(false)
        navigate('/', { replace: true })
      })
      .catch(() => {
        setLoading(false)
        toast({
          title: 'Ops! Ocorreu um erro. Verifique suas credenciais e tente novamente.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        })
      })
  }

  return (
    <Center bg="blackAlpha.50" h="100vh" w="100%">
      <Box position="absolute" right="1%" top="1%">
        <ColorModeToggle />
      </Box>
      <Box
        bg="blackAlpha.100"
        borderWidth="2px"
        borderRadius="lg"
        borderColor="blackAlpha.300"
        padding={8}
      >
        <Image ml="33%" src={logo} w={20} h={20} mb={3}></Image>
        <Stack spacing={4}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            bg="whiteAlpha.800"
            color="blackAlpha.900"
            type="email"
            placeholder="Email"
            _placeholder={{ color: 'blackAlpha.600' }}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            bg="whiteAlpha.800"
            color="blackAlpha.900"
            type="password"
            placeholder="Senha"
            _placeholder={{ color: 'blackAlpha.600' }}
          />
          <Button
            isLoading={loading}
            onClick={() => submit()}
            bg="gray.500"
            _active={{ bg: 'gray.600' }}
            _hover={{ bg: 'gray.600' }}
            color="whiteAlpha.900"
          >
            Entrar
          </Button>
        </Stack>
        <Stack spacing={2} mt="8">
          <Button
            bg="blue.600"
            _active={{ bg: 'blue.700' }}
            _hover={{ bg: 'blue.700' }}
            color="whiteAlpha.900"
            leftIcon={<FaGoogle />}
            w={60}
          >
            Entrar com o Google
          </Button>
          <Button
            bg="gray.800"
            _active={{ bg: 'gray.900' }}
            _hover={{ bg: 'gray.900' }}
            color="whiteAlpha.900"
            leftIcon={<FaGithub />}
            w={60}
          >
            Entrar com o Github
          </Button>

          <Link
            onClick={() => navigate('/signup', { replace: true })}
            fontSize="xs"
            mt="2"
          >
            Não tem uma conta ainda? Clique aqui
          </Link>
        </Stack>
      </Box>
    </Center>
  )
}

export default SignIn
