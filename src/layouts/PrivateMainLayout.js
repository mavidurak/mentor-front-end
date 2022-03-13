import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";

const PrivateOutlet = (...rest) => {
  const auth = localStorage.getItem("X-AccessToken");
  return (auth ?
    <MainLayout>
      <Outlet />
    </MainLayout>
    : <Navigate to="/guest/login" />
  )
}

export default PrivateOutlet