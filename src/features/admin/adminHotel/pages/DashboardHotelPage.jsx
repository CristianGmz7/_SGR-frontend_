import { useEffect } from "react";
import { useDashboardAdminHotel } from "../hooks/useDashboardAdminHotel";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export const DashboardHotelPage = () => {

  const { hotelIdNameData, isLoading, error, loadHotelIdName } = useDashboardAdminHotel();

  useEffect(() => {
    loadHotelIdName()
  }, [])

  if(isLoading){
    return (
    <div className="flex flex-auto justify-center">
      <CircularProgress />
    </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Panel de Control de {hotelIdNameData?.data?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Habitaciones */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-md">
          <Link
            to={`/administrationHotelPage/dashboardHotelPage/roomsPage/${hotelIdNameData?.data?.id}`}
          >
            <button className="w-full h-24 text-lg mb-4 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="mr-2 h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9V7.5a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25V9M21.75 9v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V9M21.75 9l-9 6-9-6" />
              </svg>
              Habitaciones
            </button>
          </Link>
          <div>
            <p className="text-gray-500">Explora las habitaciones con las que cuenta el hotel...</p>
          </div>
        </div>

        {/* Card Servicios Adicionales */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-md">
        <Link
          to={`/administrationHotelPage/dashboardHotelPage/additionalServicesPage/${hotelIdNameData?.data?.id}`}
        >
          <button className="w-full h-24 text-lg mb-4 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="mr-2 h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 01.75-.75h9a.75.75 0 01.75.75v6.75H6.75V12zm12 0h.75a2.25 2.25 0 012.25 2.25v6.75a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75v-6.75A2.25 2.25 0 014.5 12H5.25m0-2.25V7.5a4.5 4.5 0 014.5-4.5h4.5a4.5 4.5 0 014.5 4.5v2.25" />
            </svg>
            Servicios Adicionales
          </button>
        </Link>
          <div>
            <p className="text-gray-500">Administra los servicios adicionales disponibles en el hotel</p>
          </div>
        </div>

        {/* Card Reservas */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-md">
          <Link
            to={`/administrationHotelPage/dashboardHotelPage/reservationsPage/${hotelIdNameData?.data?.id}`}
          >
            <button className="w-full h-24 text-lg mb-4 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="mr-2 h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12.75h7.5M8.25 15.75h4.5m-6-3v-7.5a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0119.5 5.25v7.5a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25z" />
              </svg>
              Reservas
            </button>
          </Link>
          <div>
            <p className="text-gray-500">Revisa y consulta el estado de reservas</p>
          </div>
        </div>
      </div>

      {/* Card Editar Hotel */}
      <div className="mt-6 flex flex-col items-center text-center p-6 bg-white shadow-md rounded-md">
        <Link
          to={`/administrationHotelPage/dashboardHotelPage/editHotel/${hotelIdNameData?.data?.id}`}
        >
          <button className="w-full h-24 text-lg mb-4 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="mr-2 h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5h-9A2.25 2.25 0 005.25 6.75v10.5A2.25 2.25 0 007.5 19.5h9a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0016.5 4.5z" />
            </svg>
            Editar Hotel
          </button>
        </Link>
        <div>
          <p className="text-gray-500">Actualiza la información con la que los usuarios miran tu Hotel</p>
        </div>
      </div>
    </div>
  );
};
