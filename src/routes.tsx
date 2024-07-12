import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense  } from 'react';
import { Spinner } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import CreateSchedule from './pages/CreateSchedule';
import { ListSchedule } from './pages/ListSchedule';

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
        <Route element={<ListSchedule/>} path='/' />
        <Route element={<CreateSchedule />} path='/include' />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;