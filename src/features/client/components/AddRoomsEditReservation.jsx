import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { RoomCardEditReservationAddRoom } from "./RoomCardEditReservationAddRoom";
import { usePaginationGetRoomsByHotelAndBetweenDates, useRooms } from "../hooks";
import Select from "react-select";

export const AddRoomsEditReservation = ({ reservation, onAddRoom }) => {
  const [hotelId, setHotelId] = useState("");

  const optionsTypeRom = [
    { value: "", label: "No interesa" },
    { value: "SENCILLA", label: "SENCILLA" },
    { value: "DOBLE", label: "DOBLE" },
    { value: "SUITE", label: "SUITE" },
  ];

  const resetFilters = () => {
    console.log("LIMPIADO FILTROS")
    setMoreFilters((prev) => ({
      ...prev,
      priceMin: -1,
      priceMax: -1,
      typeRoom: "",
    }))
  };

  const { roomsByHotelData, isLoading, error, loadRoomsByHotel } = useRooms();

    const { currentPage, moreFilters, setFetching, handlePageChange, setMoreFilters } = usePaginationGetRoomsByHotelAndBetweenDates(
      loadRoomsByHotel, 
      reservation?.startDate, 
      reservation?.finishDate, 
      hotelId);

  useEffect(() => {
    if (reservation?.roomsInfoList?.length > 0) {
      const firstRoom = reservation.roomsInfoList[0];
      // console.log("firstRoom.hotelInfo.id", firstRoom.hotelInfo.id);
      setHotelId(firstRoom.hotelInfo.id); // Asignar el hotelId del primer cuarto
    }
  }, [reservation]);

  useEffect(() => { 
    //ESTE USEEFFECT ES EL QUE SE HACE QUE SE ACTUALICEN LAS PETICIONES SEGUN LOS FILTROS
    if (hotelId) { 
      setFetching(true); 
    } 
  }, [hotelId, setFetching, moreFilters]);


  const selectedRooms = reservation?.roomsInfoList?.map(
    (room) => room.id
  );

  //ESTO SE HACE PARA VER QUE HABITACIONES PARA HACER LA FUNCIONALIDAD DE HACER COMO SWITCH CUANDO SE SELECCIONA O QUITA HABITACION
  // se llama .rooms al final porque asi se declaro en el dto
  const rooms = (roomsByHotelData?.data?.items?.rooms ?? [])?.filter(
    (room) => !selectedRooms.includes(room.id)
  ); //Arreglo con datos de habitaciones disponibles

  return (
    <>
      {/* Inicio botones filtro por precio y tipo de habitaciones */}
      <div className="p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Filtros para búsquedas mas avanzadas
        </h2>
        <div className="flex gap-4">
          {/* PRECIO MINIMO */}
          <div className="mb-4">
            <label
                htmlFor="priceMin"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Precio mínimo
              </label>
            <input
              id="priceMin"
              name="priceMin"
              type="number" 
              value={moreFilters.priceMin < 0 ? 0 : moreFilters.priceMin} 
              onChange={(e) => {
                setMoreFilters((prev) => ({
                  ...prev,
                  priceMin: parseFloat(e.target.value) || 0,
                }));
              }} 
              placeholder="Ingrese el precio minimo" 
              className="w-28 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
            />
          </div>
          {/* PRECIO MAXIMO */}
          <div className="mb-4">
            <label
                htmlFor="priceMax"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Precio máximo
              </label>
            <input
              id="priceMax"
              name="priceMax"
              type="number" 
              value={moreFilters.priceMax < 0 ? 0 : moreFilters.priceMax} 
              onChange={(e) => {
                setMoreFilters((prev) => ({
                  ...prev,
                  priceMax: parseFloat(e.target.value) || 0,
                }));
              }} 
              placeholder="Ingrese el precio maximo" 
              className="w-28 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
            />
          </div>
        </div>
        {/* TIPO HABITACION */}
        <div>
          <label
            htmlFor="typeRoom"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo de Habitación
          </label>
          <Select
            id="typeRoom"
            options={optionsTypeRom}
            placeholder="Tipo de habitación"
            noOptionsMessage={() =>
              error ? "Error cargando datos" : "No se encontraron resultados"
            }
            value={
              moreFilters.typeRoom
                ? optionsTypeRom.find((opt) => opt.value === moreFilters.typeRoom)
                : null
            }
            onChange={(option) => {
              setMoreFilters((prev) => ({
                ...prev,
                typeRoom: option?.value || "",
              }));
            }}
          />
        </div>
      <button
        type="button"
        className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={resetFilters}
      >
        Limpiar filtros
      </button>
      </div>
      {/* Fin botones filtro por precio y tipo de habitaciones */}
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
