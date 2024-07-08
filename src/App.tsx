import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from './routes'

function App() {
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
      
  )
}

export default App
