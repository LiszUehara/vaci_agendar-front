import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense  } from 'react';
import { Spinner } from '@chakra-ui/react';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        element={
          <>
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </>
        }
      >
        <Route element={<>Pagina Inicial</>} path='/' />
        <Route element={<>Lista</>} path='/list' />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;