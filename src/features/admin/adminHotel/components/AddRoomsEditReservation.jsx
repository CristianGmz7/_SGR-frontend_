import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { RoomCardEditReservationAddRoom } from "./RoomCardEditReservationAddRoom";
import { usePaginationGetRoomsByHotelAndBetweenDates, useRooms } from "../../../client/hooks";


export const AddRoomsEditReservation = ({ reservation, onAddRoom, hotelId }) => {

  const { roomsByHotelData, isLoading, error, loadRoomsByHotel } = useRooms();
  const { currentPage, setFetching, handlePageChange } = usePaginationGetRoomsByHotelAndBetweenDates(loadRoomsByHotel, reservation?.startDate, reservation?.finishDate, hotelId);

  //se agregó este useEffect cada que cambie reservation
  useEffect(() => {
    setFetching(true)
  }, [reservation.startDate, reservation.finishDate])
  

  const selectedRooms = reservation?.roomsInfoList?.map(
    (room) => room.id
  );

  const rooms = (roomsByHotelData?.data?.items?.rooms ?? [])?.filter(
    (room) => !selectedRooms.includes(room.id)
  ); //Arreglo con datos de habitaciones disponibles


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
}
