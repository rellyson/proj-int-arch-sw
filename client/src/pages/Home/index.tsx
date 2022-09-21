import {
  Button,
  Flex,
  TableContainer,
  Table,
  useToast,
  Thead,
  Tr,
  Th,
  Tbody,
  Skeleton,
  Td,
  IconButton,
  Link,
  Tooltip,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import NavBar from '../../components/Navbar'
import './styles.css'
import { AddIcon, CopyIcon, DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { BiHide, BiShow } from 'react-icons/bi'
import { AiOutlineSecurityScan } from 'react-icons/ai'
import NewItemModal from '../../components/NewItemModal'
import { deleteVaultItem, getVaultItems, VaultItem } from '../../services/vaults'
import { formatDate } from '../../utils/date'
import { checkPasswordHaveBeenPwned } from '../../services/security'

const Home: FC = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [checkingPassword, setCheckingPassword] = useState(false)
  const [vaultItems, setVaultItems] = useState([] as any)
  const [openModal, setOpenModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const tableHeaders: string[] = ['Nome', 'Usuário', 'Senha', 'Link', 'Criado em']

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Senha copiada para o clipboard!',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  const checkPasswordIntegrity = async (password: string) => {
    setCheckingPassword(true)
    await checkPasswordHaveBeenPwned(password).then((pwnedNumbers) => {
      toast({
        title:
          pwnedNumbers > 0
            ? `Senha comprometida. Recomenda-se trocar a senha para evitar problemas de segurança.`
            : 'Sua senha é segura.',
        status: pwnedNumbers > 0 ? 'warning' : 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })

      setCheckingPassword(false)
    })
  }

  useEffect(() => {
    const fetchVaultItems = async () => {
      return await getVaultItems()
    }

    fetchVaultItems()
      .then((items: VaultItem[]) => {
        items.forEach((item) => {
          setVaultItems((current: any) => [
            ...current,
            {
              Id: item.Id,
              Nome: item.Name,
              Usuário: item.UsernameOrEmail,
              Senha: item.Password,
              Link: (
                <Link href={item.Link} isExternal>
                  Abrir link <ExternalLinkIcon mx="2px" />
                </Link>
              ),
              'Criado em': formatDate(new Date(item.CreationDate)),
            },
          ])
        })
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        toast({
          title:
            'Ops! Ocorreu um erro ao buscar os itens. Tente novamente em alguns instantes.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        })
      })
  }, [])

  const deleteItem = async (id: string) => {
    await deleteVaultItem(id)
      .then((res) => {
        setVaultItems(vaultItems.filter((item: any) => item.Id !== id))

        toast({
          title: 'Item deletado com sucesso!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        })
      })
      .catch(() => {
        toast({
          title: 'Ops! Não foi possível deletar o item.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        })
      })
  }

  return (
    <Flex direction="column" alignItems="center" bg="blackAlpha.50" h="100vh" w="100%">
      <NavBar />
      <Flex direction="column" w="48%" mt="8">
        <Button
          alignSelf="flex-end"
          size="sm"
          bg="blackAlpha.300"
          _hover={{ bg: 'blackAlpha.400' }}
          _active={{ bg: 'blackAlpha.400' }}
          leftIcon={<AddIcon />}
          onClick={() => {
            setOpenModal(true)
          }}
        >
          Criar novo item
        </Button>
      </Flex>

      <TableContainer m="6" width="50%" height="100vh" p="4">
        <Table size="sm">
          <Thead>
            <Tr>
              {tableHeaders.map((header, index) => (
                <Th id={`header-${index}`}>{header}</Th>
              ))}
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                {tableHeaders.map((_, index) => (
                  <Td id={`td-${index}`}>
                    <Skeleton height="6" fadeDuration={0.5} />
                  </Td>
                ))}
              </Tr>
            ) : (
              vaultItems.map((item: any, index: any) => (
                <Tr id={`tr-${index}`}>
                  {tableHeaders.map((column: any, index: any) =>
                    column === 'Senha' ? (
                      showPassword ? (
                        <Td id={`td-${index}`}>{item[column]}</Td>
                      ) : (
                        <Td id={`td-${index}`}>***********</Td>
                      )
                    ) : (
                      <Td id={`td-${index}`}>{item[column]}</Td>
                    ),
                  )}
                  <Td align="center">
                    <Tooltip label="Conferir segurança da senha">
                      <IconButton
                        isLoading={checkingPassword}
                        bg="blackAlpha.300"
                        _active={{ bg: 'blackAlpha.400' }}
                        _hover={{ bg: 'blackAlpha.400' }}
                        aria-label="check-password"
                        icon={<AiOutlineSecurityScan />}
                        onClick={() => {
                          checkPasswordIntegrity(item.Senha)
                        }}
                        ml="2"
                        w="10%"
                      ></IconButton>
                    </Tooltip>

                    <Tooltip label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                      <IconButton
                        bg="blackAlpha.300"
                        _active={{ bg: 'blackAlpha.400' }}
                        _hover={{ bg: 'blackAlpha.400' }}
                        aria-label="hide-password"
                        icon={showPassword ? <BiHide /> : <BiShow />}
                        onClick={() => {
                          setShowPassword(!showPassword)
                        }}
                        ml="2"
                        w="10%"
                      ></IconButton>
                    </Tooltip>

                    <Tooltip label="Copiar senha">
                      <IconButton
                        bg="blackAlpha.300"
                        _active={{ bg: 'blackAlpha.400' }}
                        _hover={{ bg: 'blackAlpha.400' }}
                        aria-label="copy-password"
                        icon={<CopyIcon />}
                        onClick={() => {
                          copyToClipboard(item.Senha)
                        }}
                        ml="2"
                        w="10%"
                      ></IconButton>
                    </Tooltip>

                    <Tooltip label="Remover item">
                      <IconButton
                        bg="blackAlpha.300"
                        _active={{ bg: 'blackAlpha.400' }}
                        _hover={{ bg: 'blackAlpha.400' }}
                        aria-label="delete-item"
                        icon={<DeleteIcon color="red.400" />}
                        onClick={() => {
                          deleteItem(item.Id)
                        }}
                        ml="2"
                        w="10%"
                      ></IconButton>
                    </Tooltip>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <NewItemModal
        isOpen={openModal}
        setOpenModal={setOpenModal}
        setVaultItems={setVaultItems}
      />
    </Flex>
  )
}

export default Home
