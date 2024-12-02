import { Route, Routes } from "react-router-dom"
import { ClientRouter } from "../features/client/routes/ClientRouter"
import { SecurityRouter } from "../features/security/routes/SecurityRouter"
import { AdministrationPageRouter } from "../features/admin/adminPage/routes/AdministrationPageRouter"
import { ProtectedLayoutAdminPage } from "../shared/components/ProtectedLayoutAdminPage"
import { AdministrationHotelRouter } from "../features/admin/adminHotel/routes/AdministrationHotelRouter"
import { ProtectedLayoutHotelPage } from "../shared/components/ProtectedLayoutHotelPage"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/security/*" element={<SecurityRouter/>}/>

      <Route element={<ProtectedLayoutAdminPage />}>
        <Route path='/administrationPage/*' element={<AdministrationPageRouter />}/>
      </Route>

      <Route element={<ProtectedLayoutHotelPage />}>
        <Route path="/administrationHotelPage/*" element={<AdministrationHotelRouter/>}/>
      </Route>

      <Route path="/*" element={<ClientRouter />}/>
    </Routes>
  )
}
