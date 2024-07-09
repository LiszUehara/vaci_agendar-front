import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';


export const customRender = (ui: ReactNode) => render(ui, { wrapper: BrowserRouter });

export * from '@testing-library/react';