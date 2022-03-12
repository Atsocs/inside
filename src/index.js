import { render } from 'react-dom'
import App from './App'
import { CSSReset, ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
const root = document.getElementById('root')
render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
  root
)
