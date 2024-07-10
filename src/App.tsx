import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from './routes'
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <ChakraProvider  toastOptions={{ defaultOptions: { position: 'top-right', isClosable: true, duration: 3000, variant: 'left-accent' } }}>
      <AppRoutes />
    </ChakraProvider>
      
  )
}

export default App
