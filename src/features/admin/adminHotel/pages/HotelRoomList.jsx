import { RoomCard } from "../../../client/components";
import {
  usePaginationGetRoomsByHotelAndBetweenDates,
  useRooms,
} from "../../../client/hooks";
import { useCreateReservation } from "../contexts/reservationCreateContext";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Button, CircularProgress, Pagination } from "@mui/material";
import dayjs from "dayjs";
import esMx from "dayjs/locale/es-mx";

import { toast } from "react-toastify";

import { Link, useParams } from "react-router-dom";

import { useState } from "react";
import Select from "react-select";


export const HotelRoomList = () => {
  const {
    clientToReservation,
    selectedRooms,
    toggleRoomSelection,
    isRoomSelected,
    setDayInterval,
  } = useCreateReservation();

  //Crear variable de estado para las fecha inicial y final
  let sDate = new Date();
  let fDate = new Date(sDate);
  fDate.setDate(sDate.getDate() + 1);

  //se usa la librería dayjs por la variedad de formatos para representar fechas y horas
  const [startDate, setStartDate] = useState(dayjs(sDate));
  const [finishDate, setFinishDate] = useState(dayjs(fDate));

  //Almacena las fechas de filtro   ¿?  (convertidas a formato ISO)
  const [filter, setFilter] = useState({
    // startDate: null,
    // finishDate: null,      //se tuvo que cambiar los valores nulos iniciales a los de estado porque si no tiraba error
    startDate: startDate,
    finishDate: finishDate,
  });

  const { hotelId } = useParams();

  const { roomsByHotelData, isLoading, error, loadRoomsByHotel } = useRooms();
  const { currentPage, handlePageChange, setFetching, moreFilters, setMoreFilters } =
    usePaginationGetRoomsByHotelAndBetweenDates(
      loadRoomsByHotel,
      filter?.startDate,
      filter?.finishDate,
      hotelId
    );

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

  // Función para manejar la validación y aplicar el filtro de fechas
  const handleFilterClick = () => {
    //verifica que fecha inicio no se mayor que fecha fin
    if (startDate > finishDate) {
      toast.warn("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    if (moreFilters.priceMin > moreFilters.priceMax) {
      toast.warn("El precio minimo no puede ser mayor que el precio maximo");
      return;
    }

    //si todo sale bien actualiza el intervalo de fechas en el contexto
    setDayInterval(startDate, finishDate);
    //setea el filtro local convierte fechas a formato ISO y almacena el estado de filter
    setFilter({
      startDate: startDate.toISOString(),
      finishDate: finishDate.toISOString(),
    });

    //volver a hacer la petición al backend
    setFetching(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esMx}>
      <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
        <div className="grid gap-6 md:gap-8">
          {/* Inicio de div información hotel y campos de check-in y check-out*/}
          <div className="flex flex-col gap-4">
            {/* Nombre del hotel */}
            <h2 className="text-2xl font-bold tracking-tight">
              {/* {hotel?.name}{" "} */}
              {roomsByHotelData?.data?.items?.hotel?.name}{" "}
            </h2>
            {/* Descripción del hotel */}
            {/* <p className="text-muted-foreground">{hotel?.description}</p> */}
            <p className="text-muted-foreground">
              {roomsByHotelData?.data?.items?.hotel?.description}
            </p>

            {/* Inicio Campos de check-in, check-out y botón de filtrar */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              {/* Inicio Campo de check-in */}
              <div className="flex flex-col gap-2">
                <label htmlFor="check-in" className="text-sm font-medium">
                  Fecha inicio
                </label>
                <DatePicker
                  value={startDate}
                  // cuando se cambie la fecha se setean en el estado de fecha inicial
                  onChange={(newDate) => setStartDate(newDate)}
                  // se le coloca una fecha minima y un formato a mostrar
                  minDate={dayjs()}
                  format="DD/MM/YYYY"
                />
              </div>
              {/* Fin Campo de check-in */}
              {/* Inicio Campo de check-out */}
              <div className="flex flex-col gap-2">
                <label htmlFor="check-out" className="text-sm font-medium">
                  Fecha Fin
                </label>
                <DatePicker
                  format="DD/MM/YYYY"
                  value={finishDate}
                  minDate={startDate}
                  onChange={(newDate) => setFinishDate(newDate)}
                />
              </div>
              {/* Fin Campo de check-out */}
              {/* Inicio Botón de filtrar */}
              <Button onClick={handleFilterClick} variant="contained">
                Filtrar
              </Button>
              {/* Fin Botón de filtrar */}
            </div>
            {/* Fin Campos de check-in, check-out y botón de filtrar */}

            {/* Inicio botones filtro por precio y tipo de habitaciones */}
            <div>
              {/* PRECIO MINIMO */}
              <div>
                <label
                    htmlFor="priceMin"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                />
              </div>
              {/* PRECIO MAXIMO */}
              <div>
                <label
                    htmlFor="priceMax"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                />
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
            </div>
            {/* Fin botones filtro por precio y tipo de habitaciones */}
            <button
            type="button"
            className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={resetFilters}
          >
            Limpiar filtros
          </button>
          </div>
          {/* Fin de div información hotel y campos de check-in y check-out*/}

          {/* Inicio de contenedor de habitaciones por paginación */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress />
            </div>
          ) : (
            // si no esta cargando mostrar el contenido del listado de las habitaciones
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* {rooms?.map((room) => ( */}
              {roomsByHotelData?.data?.items?.rooms?.map((room) => (
                <RoomCard key={room.id} 
                  room={room} 
                  isRoomSelected={isRoomSelected}
                  toggleRoomSelection={toggleRoomSelection} 
                  isAuthenticated={true}
                />
              ))}
            </div>
          )}
          {/* Fin de contenedor de habitaciones por paginación */}

          {/* Inicio Botón implementado cuando se selecciona habitaciones */}
          {/* {selectedRooms.length > 0 && ( */}
          {selectedRooms.length > 0 && (finishDate > startDate) && (
            <div className="mt-8">
              <Link to={`/administrationHotelPage/dashboardHotelPage/confirmReservationPage/${hotelId}`}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    // esto se agrego por si el usuario entra y no le da filtrar, se coloquen
                    //las fechas que viene por defecto
                    setDayInterval(startDate, finishDate);
                  }}
                >
                  Ver Reserva
                </Button>
              </Link>
            </div>
          )}
          {/* Fin Botón implementado cuando se selecciona habitaciones */}

        </div>

        <div className="flex mt-5 justify-center">
          <Pagination
            count={roomsByHotelData?.data?.totalPages}
            page={roomsByHotelData?.data?.currentPage}
            // onChange={(_event, page) => setPage(page)}
            onChange={handlePageChange}
            key={roomsByHotelData?.data?.currentPage}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};
