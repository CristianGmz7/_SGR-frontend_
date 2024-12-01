import { CircularProgress, Pagination } from "@mui/material";
// import { useRoomList } from "../hooks/useRoomList";
import { useEffect, useState } from "react";
import { RoomCardEditReservationAddRoom } from "./RoomCardEditReservationAddRoom";
import { usePaginationGetRoomsByHotelAndBetweenDates, useRooms } from "../hooks";

export const AddRoomsEditReservation = ({ reservation, onAddRoom }) => {
  // const [page, setPage] = useState(1);
  const [hotelId, setHotelId] = useState("");

  const { roomsByHotelData, isLoading, error, loadRoomsByHotel } = useRooms();
  console.log(roomsByHotelData);

  // console.log(hotelId);

    //OJALA QUE LA PAGINACION LOGRE FUNCIONAR PORQUE NO SE MANDA EL SETFECHING POR AQUI
    // console.log("hotelId", hotelId);
    const { currentPage, setFetching, handlePageChange } = usePaginationGetRoomsByHotelAndBetweenDates(loadRoomsByHotel, reservation?.startDate, reservation?.finishDate, hotelId);

  useEffect(() => {
    if (reservation?.roomsInfoList?.length > 0) {
      const firstRoom = reservation.roomsInfoList[0];
      // console.log("firstRoom.hotelInfo.id", firstRoom.hotelInfo.id);
      setHotelId(firstRoom.hotelInfo.id); // Asignar el hotelId del primer cuarto
    }
  }, [reservation]);

  useEffect(() => { 
    if (hotelId) { 
      setFetching(true); 
    } 
  }, [hotelId, setFetching]);


  const selectedRooms = reservation?.roomsInfoList?.map(
    (room) => room.id
  );

  //ESTO SE HACE PARA VER QUE HABITACIONES PARA HACER LA FUNCIONALIDAD DE HACER COMO SWITCH CUANDO SE SELECCIONA O QUITA HABITACION
  // se llama .rooms al final porque asi se declaro en el dto
  const rooms = (roomsByHotelData?.data?.items?.rooms ?? [])?.filter(
    (room) => !selectedRooms.includes(room.id)
  ); //Arreglo con datos de habitaciones disponibles

  // console.log(roomsByHotelData);
  return (
    <>
      <div className="separator my-5"></div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        // si no esta cargando mostrar el contenido del listado de las habitaciones
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms?.map((room) => (
            <RoomCardEditReservationAddRoom
              key={room.id}
              room={room}
              onAdd={() => onAddRoom(room)}
            />
          ))}
        </div>
      )}

      <div className="flex mt-5 justify-center">
        <Pagination
          count={roomsByHotelData?.data?.totalPages}
          page={roomsByHotelData?.data?.currentPage}
          onChange={handlePageChange}
          key={roomsByHotelData?.data?.currentPage}
        />
      </div>
    </>
  );
};
