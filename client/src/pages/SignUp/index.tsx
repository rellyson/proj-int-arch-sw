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
import { signUpUser } from '../../services/auth'

const SignUp: FC = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const submit = async () => {
    if (password !== passwordConfirmation) {
      toast({
        title: 'Password confirmation is not correct.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })

      return
    }

    setLoading(true)
    await signUpUser(fullName, email, password)
      .then(() => {
        setLoading(false)
        toast({
          title: 'Conta criada com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        setTimeout(() => {}, 4000)
        navigate('/signin', { replace: false })
      })
      .catch(() => {
        setLoading(false)
        toast({
          title: 'Ops! Ocorreu um erro. Verifique os dados e tente novamente.',
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
        w="25%"
        borderWidth="2px"
        borderRadius="lg"
        borderColor="blackAlpha.300"
        padding={8}
      >
        <Image ml="36%" src={logo} w={20} h={20} mb={3}></Image>
        <Stack spacing={4}>
          <Input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Nome completo"
            bg="whiteAlpha.800"
            color="blackAlpha.900"
            _placeholder={{ color: 'blackAlpha.600' }}
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            bg="whiteAlpha.800"
            color="blackAlpha.900"
            _placeholder={{ color: 'blackAlpha.600' }}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Senha"
            bg="whiteAlpha.800"
            color="blackAlpha.900"
            _placeholder={{ color: 'blackAlpha.600' }}
          />
          <Input
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            placeholder="Confirmar senha"
            bg="whiteAlpha.800"
            color="blackAlpha.900"
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
            Criar conta
          </Button>
        </Stack>
        <Stack spacing={2} mt="8">
          <Button
            bg="blue.600"
            _active={{ bg: 'blue.700' }}
            _hover={{ bg: 'blue.700' }}
            color="whiteAlpha.900"
            leftIcon={<FaGoogle />}
          >
            Criar conta com o Google
          </Button>
          <Button
            bg="gray.800"
            _active={{ bg: 'gray.900' }}
            _hover={{ bg: 'gray.900' }}
            color="whiteAlpha.900"
            leftIcon={<FaGithub />}
          >
            Criar conta com o Github
          </Button>

          <Link
            onClick={() => navigate('/signin', { replace: true })}
            fontSize="xs"
            mt="4"
          >
            Já tem uma conta? Clique aqui.
          </Link>
        </Stack>
      </Box>
    </Center>
  )
}

export default SignUp
