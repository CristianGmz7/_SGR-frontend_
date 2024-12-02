import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/security/store";

export const ProtectedLayoutIsAuthenticated = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if(!isAuthenticated){
    return <Navigate to="/home"/>
  }

  return (
    <>
      <Outlet />
    </>
  )
}
