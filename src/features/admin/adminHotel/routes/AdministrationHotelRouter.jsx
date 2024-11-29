import { Navigate, Route, Routes } from "react-router-dom"
import { Footer, Nav, SideBar } from "../../../client/components"
import { AdditionalServicesPage, CreateRoomPage, DashboardHotelPage, EditHotelPage, ReservationsPage, RoomsPage } from "../pages"

export const AdministrationHotelRouter = () => {
  return (
    <div className="overflow-x-hidden bg-gray-100 w-screen h-screen">
      <Nav />
      <div className="px-6 py-8 flex">
        <SideBar />
        <div className="flex-1 ml-14 md:ml-48">
          <Routes>
            <Route path="/dashboardHotelPage" element={<DashboardHotelPage/>}/>
            <Route path="/dashboardHotelPage/editHotel/:hotelId" element={<EditHotelPage/>}/>
            <Route path="/dashboardHotelPage/roomsPage/:hotelId" element={<RoomsPage />}/>
            <Route path="/dashboardHotelPage/additionalServicesPage/:hotelId" element={<AdditionalServicesPage />}/>
            <Route path="/dashboardHotelPage/reservationsPage/:hotelId" element={<ReservationsPage />}/>
            <Route path="/dashboardHotelPage/createRoom/:hotelId" element={<CreateRoomPage />}/>
            <Route path="/*" element={<Navigate to={"/dashboardHotelPage"}/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}
