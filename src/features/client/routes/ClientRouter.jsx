import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage, HotelRoomList, ReservationDetailsConfirm } from "../pages";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { SideBar } from "../components/SideBar";
import { ReservationProvider } from "../contexts";

export const ClientRouter = () => {
  return (
    <div className="overflow-x-hidden bg-gray-100 w-screen h-screen">
      <Nav />
      <div className="px-6 py-8 flex">
        <SideBar />
        <div className="flex-1 ml-14 md:ml-48">
          <Routes>
            <Route path="/home" element={<HomePage />} />

            <Route
              element={
                <ReservationProvider>
                  <Outlet />
                </ReservationProvider>
              }
            >
              <Route
                path="/hotelRoomList/:hotelId"
                element={<HotelRoomList />}
              />
              <Route
                path="/reservationDetailsConfirm/:hotelId"
                element={<ReservationDetailsConfirm />}
              />
            </Route>

            {/* Ruta del context de editar reserva, creo que no será necesario */}
            {/* Ruta home */}
            <Route path="/*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
