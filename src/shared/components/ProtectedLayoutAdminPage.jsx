import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../features/security/store"
import { rolesListConstant } from "../constants/roles-list.constant"

export const ProtectedLayoutAdminPage = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const roles = useAuthStore((state) => state.roles)

  if(!isAuthenticated || !roles.some(role => [rolesListConstant.PAGEADMIN].includes(role) )){
    return <Navigate to="/home"/>
  }

  return (
    <>
      <Outlet />
    </>
  )
}
