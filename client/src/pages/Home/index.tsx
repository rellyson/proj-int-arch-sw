import { Button, Flex, useToast } from '@chakra-ui/react'
import Table from '../../components/Table'
import React, { FC, useEffect, useState } from 'react'
import NavBar from '../../components/Navbar'
import './styles.css'
import { AddIcon } from '@chakra-ui/icons'
import NewItemModal from '../../components/NewItemModal'
import { getVaultItems, VaultItem } from '../../services/vaults'

const Home: FC = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [vaultItems, setVaultItems] = useState([] as any)
  const [openModal, setOpenModal] = useState(false)
  const tableHeaders: string[] = [
    'Nome',
    'Usuário',
    'Senha',
    'Link',
    'Criado em',
    'Ações',
  ]

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
              Nome: item.Name,
              Usuário: item.UsernameOrEmail,
              Senha: item.Password,
              MaskedPassword: '******************',
              Link: item.Link || '',
              'Criado em': item.CreationDate,
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
      <Table
        width="50%"
        height="100vh"
        size="sm"
        isLoading={isLoading}
        headers={tableHeaders}
        body={vaultItems}
      />
      <NewItemModal isOpen={openModal} setOpenModal={setOpenModal} />
    </Flex>
  )
}

export default Home
