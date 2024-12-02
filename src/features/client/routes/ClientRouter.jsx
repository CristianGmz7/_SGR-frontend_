import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { EditReservation, HomePage, HotelRoomList, ReservationDetailsConfirm, YourReservations } from "../pages";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { SideBar } from "../components/SideBar";
import { ReservationEditProvider, ReservationProvider } from "../contexts";
import { ProtectedLayoutIsAuthenticated } from "../../../shared/components";

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

              <Route element={<ProtectedLayoutIsAuthenticated/>}>
                <Route
                  path="/reservationDetailsConfirm/:hotelId"
                  element={<ReservationDetailsConfirm />}
                />
              </Route>

            </Route>
            
            <Route element={<ProtectedLayoutIsAuthenticated/>}>
              <Route
                element={
                  <ReservationEditProvider>
                    <Outlet />
                  </ReservationEditProvider>
                }
              >
                <Route path="/yourReservations" element={<YourReservations />}/>
                <Route path="/editReservation/:reservationId" element={<EditReservation />}/>
              </Route>
            </Route>

            <Route path="/*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
