import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

const PrivateOutlet = (...rest) => {
  const auth = true;
  return (auth ?
    <MainLayout>
      <Outlet />
    </MainLayout>
    : <Navigate to="/guest/login" />
  )
}

export default PrivateOutlet