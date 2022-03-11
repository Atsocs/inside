import { render } from 'react-dom'
import App from './App'
import { CSSReset, ChakraProvider } from '@chakra-ui/react'
const root = document.getElementById('root')
render(
  <ChakraProvider>
    <CSSReset />
    <App />
  </ChakraProvider>,
  root
)
