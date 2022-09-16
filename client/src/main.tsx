import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Routes />
  </ChakraProvider>,
  document.getElementById('root'),
)
