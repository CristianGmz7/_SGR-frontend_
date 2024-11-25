import { CircularProgress, Pagination } from "@mui/material";
// import { useRoomList } from "../hooks/useRoomList";
import { useEffect, useState } from "react";
import { RoomCardEditReservationAddRoom } from "./RoomCardEditReservationAddRoom";
import { usePaginationGetRoomsByHotelAndBetweenDates, useRooms } from "../hooks";

export const AddRoomsEditReservation = ({ reservation, onAddRoom }) => {
  // const [page, setPage] = useState(1);
  const [hotelId, setHotelId] = useState("");

  useEffect(() => {
    if (reservation?.roomsInfoList?.length > 0) {
      const firstRoom = reservation.roomsInfoList[0];
      setHotelId(firstRoom.hotelInfo.id); // Asignar el hotelId del primer cuarto
    }
  }, [reservation]);

  const { roomsByHotelData, isLoading, error, loadRoomsByHotel } = useRooms();
  //OJALA QUE LA PAGINACION LOGRE FUNCIONAR PORQUE NO SE MANDA EL SETFECHING POR AQUI
  const { currentPage, setFetching, handlePageChange } = usePaginationGetRoomsByHotelAndBetweenDates(loadRoomsByHotel, reservation?.startDate, reservation?.finishDate, hotelId);

  const selectedRooms = reservation?.roomsInfoList?.map(
    (room) => room.id
  );

  //OJO CON ESTE ACCESO A PROPIEDADES QUE VIENEN DEL BACKEND (ESTADO COMO ESTABA ANTES)
  // const rooms = (data?.data?.items?.rooms ?? [])?.filter(
  //   (room) => !selectedRooms.includes(room.id)
  // ); //Arreglo con datos de habitaciones disponibles
  // // ESTE CAMPO NO SE NECESITA AQUI // const hotel = data?.data?.items?.hotel; //objeto con la info del hotel
  // const pagination = data?.data;

  //ESTO SE HACE PARA VER QUE HABITACIONES PARA HACER LA FUNCIONALIDAD DE HACER COMO SWITCH CUANDO SE SELECCIONA O QUITA HABITACION
  const rooms = (roomsByHotelData?.data?.items?.roomsInfoList ?? [])?.filter(
    (room) => !selectedRooms.includes(room.id)
  ); //Arreglo con datos de habitaciones disponibles
  // ESTE CAMPO NO SE NECESITA AQUI // const hotel = data?.data?.items?.hotel; //objeto con la info del hotel

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

      <p>Nuevo Total: $$$</p>
      <p>
        Replicar el ReservationCard para mostrar como quedaria la nueva
        reservacion
      </p>
    </>
  );
};
