import { useToast } from '@chakra-ui/react';
import { createContext, ReactNode } from 'react';

const AlertContext = createContext({
    success: (_message: string)=> {},
    error: (_message: string)=> {}
});

interface IAlertContextProvider {
    children: ReactNode
} 
const AlertContextProvider = ({ children }: IAlertContextProvider) => {
    const toast = useToast()
    const success  = (message: string) => {
        toast({
            title: message,
            status: 'success'
        })
    }
    const error  = (message: string) => {
        toast({
            title: message,
            status: 'error'
        })
    }

  return (
    <AlertContext.Provider value={{ success, error }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext };

export default AlertContextProvider;