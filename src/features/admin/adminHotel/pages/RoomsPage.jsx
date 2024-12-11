import { Link, useParams } from "react-router-dom";
import { useRooms } from "../hooks/useRooms";
import { useEffect } from "react";
import { RoomCard } from "../components";
import { Button, CircularProgress, Pagination } from "@mui/material";
import { usePaginationAdminHotel } from "../../../client/hooks";
import { FaSearch } from "react-icons/fa";

export const RoomsPage = () => {
  const { hotelId } = useParams();
  const { roomsData, isLoading, error, loadRoomsHotelData, deleteRoom } = useRooms();
  const { currentPage, searchTerm, handlePageChange, setFetching, handleSearchTermChange, handleSubmit } = usePaginationAdminHotel(loadRoomsHotelData, hotelId);


  useEffect(() => {
    //setear valores iniciales para que obtenga todos hoteles de page 1
    loadRoomsHotelData(hotelId, "", 1);
  }, [hotelId]);

  return (
    <>
      <Link
        className="mb-4"
        to={`/administrationHotelPage/dashboardHotelPage/createRoom/${hotelId}`}
      >
        <Button
          variant="contained"
          //falta onclick
        >
          Crear Habitación
        </Button>
      </Link>

      <form onSubmit={handleSubmit} className="mt-3 flex items-center bg-white rounded-lg mb-4">
          <div className="w-full">
            <input 
              value={searchTerm}
              onChange={(e) => handleSearchTermChange(e.target.value)}
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="Buscar Numeró Habitación"
            />
          </div>
          <div>
            <button type="submit"
            className="flex items-center bg-unah-yellow justify-center w-12 h-12 text-black rounded-r-lg" >
              <FaSearch className="h-6 w-6" />
            </button>
          </div>
        </form>
      {
      isLoading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : roomsData?.data?.items?.rooms?.length <= 0 ?
      (
        <div className="flex justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center min-h-[300px] w-full bg-white">
          <div className="text-center text-4xl text-gray-300 font-bold opacity-50">
            No hay habitaciones que mostrar
          </div>
        </div>
      </div>
      )
      : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {roomsData?.data?.items?.rooms?.map((room) => (
            <RoomCard key={room.id} room={room} isEditingOrCreating={false} deleteRoom={deleteRoom}/>
            // para mostrar el renderizado se muestra en el RoomCard
          ))}
        </div>
      )
      }
        <div className="flex mt-5 justify-center">
          <Pagination
            count={roomsData?.data?.totalPages}
            page={roomsData?.data?.currentPage}
            // onChange={(_event, page) => setPage(page)}
            onChange={handlePageChange}
            key={roomsData?.data?.currentPage}
          />
        </div>
    </>
  );
};
