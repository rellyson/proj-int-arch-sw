import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { RepeatIcon } from '@chakra-ui/icons'
import { BiHide, BiShow } from 'react-icons/bi'
import { generatePassword } from '../../services/auth'
import { createVaultItem } from '../../services/vaults'

interface NewItemModalProps {
  isOpen: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const NewItemModal: FC<NewItemModalProps> = ({ isOpen, setOpenModal }) => {
  const toast = useToast()
  const { onClose } = useDisclosure()
  const [name, setName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(true)
  const [link, setLink] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const generateRandomPassword = () => {
    const randomPassword = generatePassword(16)
    setPassword(randomPassword)
  }

  const submit = async () => {
    setIsLoading(true)
    await createVaultItem(name, username, password, link)
      .then(() => {
        setIsLoading(false)
        setOpenModal(false)
        toast({
          title: 'Novo item criado com sucesso!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        })
      })
      .catch(() => {
        setIsLoading(false)
        toast({
          title:
            'Ops! Ocorreu um erro ao criar item. Tente novamente em alguns instantes.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        })
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Criar novo item</ModalHeader>
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              placeholder="Nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </FormControl>

          <FormControl isRequired mt="4">
            <FormLabel>Email ou nome de usuário</FormLabel>
            <Input
              placeholder="Email ou nome de usuário"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </FormControl>

          <FormControl isRequired mt="4">
            <FormLabel>Senha</FormLabel>
            <Input
              placeholder="Senha"
              value={showPassword ? password : '***************'}
              w="75%"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Tooltip label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
              <IconButton
                aria-label="hide-password"
                icon={showPassword ? <BiHide /> : <BiShow />}
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
                ml="2%"
                w="10%"
              ></IconButton>
            </Tooltip>
            <Tooltip label="Gerar senha aleatória">
              <IconButton
                aria-label="generate-random-password"
                icon={<RepeatIcon />}
                onClick={() => {
                  generateRandomPassword()
                }}
                ml="2%"
                w="10%"
              ></IconButton>
            </Tooltip>
          </FormControl>

          <FormControl mt="4">
            <FormLabel>URL do site</FormLabel>
            <Input
              placeholder="URL do site"
              value={link}
              onChange={(e) => {
                setLink(e.target.value)
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              submit()
            }}
            mr={3}
            bg="blue.500"
            _active={{ bg: 'blue.600' }}
            _hover={{ bg: 'blue.600' }}
            color="whiteAlpha.900"
            isLoading={isLoading}
          >
            Criar
          </Button>
          <Button
            onClick={() => setOpenModal(false)}
            bg="red.400"
            _active={{ bg: 'red.500' }}
            _hover={{ bg: 'red.500' }}
            color="whiteAlpha.900"
            isLoading={isLoading}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default NewItemModal
