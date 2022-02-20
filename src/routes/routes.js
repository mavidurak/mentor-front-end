import { Navigate,Outlet } from 'react-router-dom';
import {
  Dashboard,
  ApplicationList,
  ApplicationAddUpdate,
  DatasetList,
  DatasetAddUpdate,
  Login,
  Register,
  Profile
} from "../screens/index"
import PrivateMainLayout from '../layouts/PrivateMainLayout';

const routes = [
  {
    path: '/',
    element: <PrivateMainLayout/>,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/profile', element: <Profile /> },
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