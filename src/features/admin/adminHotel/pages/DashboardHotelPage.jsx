import { useEffect } from "react";
import { useDashboardAdminHotel } from "../hooks/useDashboardAdminHotel";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { MdOutlineDoorBack } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";

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
              <MdOutlineDoorBack className="mr-2 h-6 w-6"/>
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
            <LuClipboardList className="mr-2 h-6 w-6"/>
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
            <FaRegCalendarAlt className="mr-2 h-6 w-6" />
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
          <HiMiniPencilSquare className="mr-2 h-6 w-6" />
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
