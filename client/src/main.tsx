import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
  <ChakraProvider>
    <Routes />
  </ChakraProvider>,
  document.getElementById('root'),
)
