import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense  } from 'react';
import { Spinner } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        element={
          <>
            <Sidebar>
              <Suspense fallback={<Spinner />}>
                <Outlet />
              </Suspense>
            </Sidebar>
          </>
        }
      >
        <Route element={<>Pagina Inicial</>} path='/' />
        <Route element={<>Incluir</>} path='/include' />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;