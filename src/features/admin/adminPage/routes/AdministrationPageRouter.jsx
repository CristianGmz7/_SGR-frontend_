import { Navigate, Route, Routes } from "react-router-dom"
import { Footer, Nav, SideBar } from "../../../client/components"
import { CreateHotelPage, DashboardAdminPage } from "../pages"

export const AdministrationPageRouter = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 w-screen pt-16">
      <Nav/>
      <div className="px-6 py-8 flex">
        <SideBar />
        <div className="flex-1 ml-14 md:ml-48">
          <Routes>
            <Route path="/dashboardAdminPage" element={<DashboardAdminPage />}/>
            <Route path="/createHotel" element={<CreateHotelPage />}/>
            <Route path="/*" element={<Navigate to={"/dashboardAdminPage"}/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}
