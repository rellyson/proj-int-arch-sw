import { Flex } from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import NavBar from '../../components/Navbar'
import './styles.css'

const Home: FC = () => {
  return (
    <Flex direction="column" alignItems="center" bg="blackAlpha.50" h="100vh" w="100%">
      <NavBar />
    </Flex>
  )
}

export default Home
