import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Footer, Nav } from "../../../client/components";    //SideBar se quitó SideBar
import {
  AdditionalServicesPage,
  ConfirmReservationPage,
  CreateRoomPage,
  DashboardHotelPage,
  EditHotelPage,
  EditReservationPage,
  EditRoomPage,
  HotelRoomList,
  ReservationsPage,
  RoomsPage,
} from "../pages";
import { CreateReservationProvider } from "../contexts/reservationCreateContext";
import { SideBar } from "../components";

export const AdministrationHotelRouter = () => {
  return (
    <div className="overflow-x-hidden bg-gray-100 w-screen h-screen">
      <Nav />
      <div className="px-6 py-8 flex">
        <SideBar />
        <div className="flex-1 ml-14 md:ml-48">
          <Routes>
            <Route
              path="/dashboardHotelPage"
              element={<DashboardHotelPage />}
            />
            <Route
              path="/dashboardHotelPage/editHotel/:hotelId"
              element={<EditHotelPage />}
            />
            <Route
              path="/dashboardHotelPage/roomsPage/:hotelId"
              element={<RoomsPage />}
            />
            <Route
              path="/dashboardHotelPage/additionalServicesPage/:hotelId"
              element={<AdditionalServicesPage />}
            />
            <Route
              path="/dashboardHotelPage/createRoom/:hotelId"
              element={<CreateRoomPage />}
            />
            <Route
              path="/dashboardHotelPage/editRoom/:roomId"
              element={<EditRoomPage />}
            />

            <Route
              element={
                <CreateReservationProvider>
                  <Outlet />
                </CreateReservationProvider>
              }
            >
              <Route
                path="/dashboardHotelPage/reservationsPage/:hotelId"
                element={<ReservationsPage />}
              />
              <Route
                path="/dashboardHotelPage/hotelRoomList/:hotelId"
                element={<HotelRoomList />}
              />
              <Route
                path="/dashboardHotelPage/confirmReservationPage/:hotelId"
                element={<ConfirmReservationPage />}
              />

              <Route
                path="/dashboardHotelPage/editReservation/:reservationId/:hotelId"
                element={<EditReservationPage />}
              />
            </Route>

            {/* posiblemente crear otro contexto solo para mandar info del usuario cuando se quiera editar reserva */}
            {/* <Route path="/dashboardHotelPage/editReservation/:reservationId" element={<EditReservationPage />}/> */}

            <Route
              path="/*"
              element={<Navigate to={"/dashboardHotelPage"} />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
