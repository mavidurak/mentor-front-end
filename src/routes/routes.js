import { Navigate,Outlet } from 'react-router-dom';
import {
  Dashboard,
  ApplicationList,
  ApplicationAddUpdate,
  DatasetList,
  DatasetAddUpdate,
  Login,
  Register
} from "../screens/index"
import PrivateOutlet from '../helpers/PrivateOutlet';
import SecuredLayout from '../layouts/SecuredLayout';

const routes = [
  {
    path: '/',
    element: <PrivateOutlet/>,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/', element: <Navigate to="/dashboard" /> },
      {
        path: 'application',
        element: <Outlet />,
        children: [
          { path: '', element: <ApplicationList/> },
          { path: 'add-update', element: <ApplicationAddUpdate/> },
        ],
      },
      {
        path: 'dataset',
        element: <Outlet />,
        children: [
          { path: '', element: <DatasetList/> },
          { path: 'add-update', element: <DatasetAddUpdate/> },
        ],
      },
    ],
  },
  {
    path: '/guest',
    element: < Outlet/>,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '', element: <Navigate to="/guest/login" /> },
    ],
  },
  {
    path: '*',
    element:  <main>Not found</main>

  },
];

export default routes;