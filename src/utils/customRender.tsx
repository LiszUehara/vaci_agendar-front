import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AlertContextProvider from '../components/contexts/alerts';

const Wrapper = ({children}: {children: ReactNode}) => {
    return (
        <BrowserRouter>
            <AlertContextProvider>
                {children}
            </AlertContextProvider>
        </BrowserRouter>
    )
}

export const customRender = (ui: ReactNode) => render(ui, { wrapper: Wrapper });

export * from '@testing-library/react';