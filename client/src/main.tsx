import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { UserProvider } from './contexts/user-context'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <UserProvider>
      <Routes />
    </UserProvider>
  </ChakraProvider>,
  document.getElementById('root'),
)
