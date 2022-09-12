import React, { FC } from 'react'
import { Text, Center, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <Center flexDirection="column" bg="blackAlpha.50" h="100vh" w="100%">
      <Text fontWeight="bold" fontSize="9xl">
        {' '}
        404
      </Text>
      <Text fontSize="2xl"> Ops! Página não encontrada.</Text>

      <Button
        onClick={() => navigate('/', { replace: true })}
        bg="gray.500"
        _active={{ bg: 'gray.600' }}
        _hover={{ bg: 'gray.600' }}
        color="whiteAlpha.900"
        mt="10"
      >
        Voltar ao início
      </Button>
    </Center>
  )
}

export default NotFound
