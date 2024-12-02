import { useAuthStore } from "../../features/security/store"

export const ProtectedComponentAdminPage = ({requiredRoles, children}) => {

  const roles = useAuthStore((state) => state.roles);

  if(!roles.some(role => requiredRoles.includes(role))){
    return null;
  }

  return (
    <>
      { children }
    </>
  )
}
