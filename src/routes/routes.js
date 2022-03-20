import { Navigate,Outlet } from 'react-router-dom';
import {
  Dashboard,
  ApplicationListScreen,
  ApplicationAddUpdateScreen,
  DatasetListScreen,
  DatasetAddUpdateScreen,
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
          { path: '', element: <ApplicationListScreen/> },
          { path: 'add-update', element: <ApplicationAddUpdateScreen/> },
          { path: ':applicationId/add-update', element: <ApplicationAddUpdateScreen/> },
        ],
      },
      {
        path: 'dataset',
        element: <Outlet />,
        children: [
          { path: '', element: <DatasetListScreen/> },
          { path: 'add-update', element: <DatasetAddUpdateScreen/> },
          { path: ':datasetId/add-update', element: <DatasetAddUpdateScreen/> },
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