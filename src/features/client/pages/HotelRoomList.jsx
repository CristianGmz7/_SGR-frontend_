import { RoomCard } from "../components";
import { useAuthStore } from "../../security/store";
import { useReservation } from "../contexts";
import {
  useHotelsReacts,
  usePaginationGetRoomsByHotelAndBetweenDates,
  useRooms,
} from "../hooks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, CircularProgress, Pagination } from "@mui/material";
import dayjs from "dayjs";
import esMx from "dayjs/locale/es-mx";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import Select from "react-select";


export const HotelRoomList = () => {
  const { hotelId } = useParams();
  //autenticación para crear reservas
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { selectedRooms, toggleRoomSelection, isRoomSelected, setDayInterval } =
    useReservation();

  const {
    reactions,
    isLoading: isLoadingHotelReacts,
    error: errorHotelReacts,
    loadHotelReact,
    createHotelReact,
    editHotelReact,
    deleteHotelReact,
    setReactions,
  } = useHotelsReacts();

  useEffect(() => {
    loadHotelReact(hotelId, isAuthenticated);
  }, [hotelId, isAuthenticated]);

  //handle para manejar las funciones del hook de reaccionar
  const handleActionsHotelReact = async (hotelId, buttonClicked) => {
    if (buttonClicked === "LikeButton") {
      if (reactions.unLikeActive) {
        //editar el no me gusta y dejar el like encendido
        const result = await editHotelReact(hotelId, "SWITCHLIKED");
        const newValue = result?.data?.action;

        if (newValue === "LIKED") {
          setReactions((prev) => ({
            ...prev,
            likeActive: true,
            unLikeActive: false,
          }));
        }

        return;
      }

      if (reactions.likeActive) {
        //eliminar el me gusta y dejar el like apagado
        const result = await deleteHotelReact(hotelId, "REMOVELIKED");
        const newValue = result?.data?.action;

        if (newValue === "REMOVELIKED") {
          setReactions((prev) => ({
            ...prev,
            likeActive: false,
            unLikeActive: false,
          }));
        }

        return;
      }

      //crear el me gusta y dejar el like encendido
      const result = await createHotelReact(hotelId, "LIKED");
      const newValue = result?.data?.action;
      if (newValue === "LIKED") {
        setReactions((prev) => ({
          ...prev,
          likeActive: true,
          unLikeActive: false,
        }));
      }

      return;
    }

    if (reactions.likeActive) {
      //editar el me gusta y dejar el unlike encendido
      const result = await editHotelReact(hotelId, "SWITCHLIKED");
      const newValue = result?.data?.action;

      if (newValue === "UNLIKED") {
        setReactions((prev) => ({
          ...prev,
          likeActive: false,
          unLikeActive: true,
        }));
      }

      return;
    }

    if (reactions.unLikeActive) {
      //eliminar el me gusta y dejar el like apagado
      const result = await deleteHotelReact(hotelId, "REMOVELIKED");
      const newValue = result?.data?.action;

      if (newValue === "REMOVELIKED") {
        setReactions((prev) => ({
          ...prev,
          likeActive: false,
          unLikeActive: false,
        }));
      }
      return;
    }

    //crear el no me gusta y dejar el unlike encendido
    const result = await createHotelReact(hotelId, "UNLIKED");
    const newValue = result?.data?.action;
    if (newValue === "UNLIKED") {
      setReactions((prev) => ({
        ...prev,
        likeActive: false,
        unLikeActive: true,
      }));
    }

    return;
  };

  //Crear variable de estado para las fecha inicial y final
  let sDate = new Date();
  let fDate = new Date(sDate);
  fDate.setDate(sDate.getDate() + 1);

  //se usa la librería dayjs por la variedad de formatos para representar fechas y horas
  const [startDate, setStartDate] = useState(dayjs(sDate));
  const [finishDate, setFinishDate] = useState(dayjs(fDate));

  //Almacena las fechas de filtro   ¿?  (convertidas a formato ISO)
  const [filter, setFilter] = useState({
    startDate: startDate,
    finishDate: finishDate,
  });

  const { roomsByHotelData, isLoading, error, loadRoomsByHotel } = useRooms();
  const { currentPage, moreFilters , handlePageChange, setFetching, setMoreFilters } =
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
    //LocalizationProvider para configurar el idioma de los DatePickers
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esMx}>
      <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
        {/* Inicio del div que sirve para agrupar */}
        <div className="grid gap-6 md:gap-8">
          {/* Inicio de div información hotel y campos de check-in y check-out*/}
          <div className="flex flex-col gap-4">
            {/* Nombre del hotel */}
            <h2 className="text-2xl font-bold tracking-tight">
              {/* {hotel?.name}{" "} */}
              {roomsByHotelData?.data?.items?.hotel?.name}{" "}
            </h2>
            {/* Descripción del hotel */}
            <p className="text-muted-foreground">
              {roomsByHotelData?.data?.items?.hotel?.description}
            </p>
            <div
              className={`flex space-x-4 ${
                !isAuthenticated ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {reactions.likeActive ? (
                <AiFillLike
                  className="h-10 w-10 text-blue-500 cursor-pointer"
                  onClick={() => handleActionsHotelReact(hotelId, "LikeButton")}
                />
              ) : (
                <AiOutlineLike
                  className="h-10 w-10 cursor-pointer"
                  onClick={() => handleActionsHotelReact(hotelId, "LikeButton")}
                />
              )}
              {reactions.unLikeActive ? (
                <AiFillDislike
                  className="h-10 w-10 text-blue-500 cursor-pointer"
                  onClick={() =>
                    handleActionsHotelReact(hotelId, "UnlikeButton")
                  }
                />
              ) : (
                <AiOutlineDislike
                  className="h-10 w-10 cursor-pointer"
                  onClick={() =>
                    handleActionsHotelReact(hotelId, "UnlikeButton")
                  }
                />
              )}
            </div>

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
              <Button 
                onClick={handleFilterClick} 
                variant="contained"
                sx={{
                  backgroundColor: "blue",
                  "&:hover": {
                    backgroundColor: "purple",
                  },
                  marginTop: 3,
                }}              
                >
                Filtrar
              </Button>
              {/* Fin Botón de filtrar */}
            </div>
            {/* Fin Campos de check-in, check-out y botón de filtrar */}

            {/* Inicio botones filtro por precio y tipo de habitaciones */}
            <div>
              <div className="flex gap-4">
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
                    className="w-28 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
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
            </div>
            {/* Fin botones filtro por precio y tipo de habitaciones */}
          <button
            type="button"
            className="inline-block max-w-fit mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"            onClick={resetFilters}
          >
            Limpiar filtros
          </button>
          </div>
          {/* Fin de div información hotel y campos de check-in y check-out*/}

          {/* Inicio de contenedor de habitaciones por paginación */}
          {/* Si la petición del filtro aun esta en curso mostrar carga de la página */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress />
            </div>
          ) : roomsByHotelData?.data?.items?.rooms?.length <= 0 ? 
          (
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center min-h-[300px] w-full bg-white">
              <div className="text-center text-4xl text-gray-300 font-bold opacity-50">
                No hay habitaciones que coincidan con tu búsqueda
              </div>
            </div>
          </div>
          )
          : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {roomsByHotelData?.data?.items?.rooms?.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isRoomSelected={isRoomSelected}
                  toggleRoomSelection={toggleRoomSelection}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          )}
          {/* Fin de contenedor de habitaciones por paginación */}

          {/* Inicio Botón implementado cuando se selecciona habitaciones */}
          {isAuthenticated &&
            selectedRooms.length > 0 &&
            finishDate > startDate && (
              <div className="mt-8">
                <Link to={`/reservationDetailsConfirm/${hotelId}`}>
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
        {/* Fin del div que sirve para agrupar */}
        <div className="flex mt-5 justify-center">
          <Pagination
            count={roomsByHotelData?.data?.totalPages}
            page={roomsByHotelData?.data?.currentPage}
            onChange={handlePageChange}
            key={roomsByHotelData?.data?.currentPage}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};
