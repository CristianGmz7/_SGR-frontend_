import { Route, Routes } from "react-router-dom"
import { ClientRouter } from "../features/client/routes/ClientRouter"
import { SecurityRouter } from "../features/security/routes/SecurityRouter"
import { AdministrationPageRouter } from "../features/admin/adminPage/routes/AdministrationPageRouter"
import { ProtectedLayoutAdminPage } from "../shared/components/ProtectedLayoutAdminPage"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/security/*" element={<SecurityRouter/>}/>
      {/* este y el de hotel tiene que ir en un ProtectedLayout, posiblemente cada uno en su propio ProtectedLayout */}
      <Route element={<ProtectedLayoutAdminPage />}>
        <Route path='/administrationPage/*' element={<AdministrationPageRouter />}/>
      </Route>
      <Route path="/*" element={<ClientRouter />}/>
    </Routes>
  )
}
