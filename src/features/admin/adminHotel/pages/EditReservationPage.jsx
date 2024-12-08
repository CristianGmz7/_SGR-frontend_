import { useParams } from "react-router-dom";
import { formatDate } from "../../../../shared/utils/format-date";
import {
  useAdditionalServices,
  useReservations,
  useSinglePagination,
} from "../../../client/hooks";

import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEditReservation, useReservations as useReservationsAdminHotel } from "../hooks";
import { useEffect, useState } from "react";
import { useCreateReservation } from "../contexts/reservationCreateContext"; //para ver el info del usuario asi como obtener el hotelId //DESCATADA ESTA OPCION, hotelId se obtiene de url y clientData de peticion
import {
  AdditionalServicesList,
  AddRoomsEditReservation,
  ChangeDatesEditReser,
  RoomReservationCard,
} from "../components";


export const EditReservationPage = () => {
  const navigate = useNavigate();
  // const { clientToReservation } = useCreateReservation();      //QUITAR ESTE CONTEXT, AÑADIR EN LA PETICION DE OBTENER POR ID QUE TAMBIEN VENGA INFO BASICA DEL USUARIO

  const { reservationDto, setInitialData, onDatesChange, onRemoveRoom, onAddRoom, onAddService, onRemoveService, onResetEditReservation } = useEditReservation();

  const { reservationId, hotelId } = useParams();
  const { reservationByIdData, isLoading, error, loadReservationById } =
    useReservationsAdminHotel();

  const {
    additionalServicesByHotelData,
    isLoading: isLoadingAdditionalServices,
    error: errorAdditionalServices,
    loadAdditionalServicesByHotel,
  } = useAdditionalServices();

  useEffect(() => {
    loadReservationById(reservationId)
      .then((data) => {
        setInitialData(data)
      });
  }, [reservationId]);

  const { setFetching } = useSinglePagination(
    loadAdditionalServicesByHotel,
    hotelId
  );

  const {
    editReservation,
    isLoading: isLoadingEditReservation,
    error: errorEditReservation,
  } = useReservations();

  const calculateDays = (reservationStartDate, reservationFinishDate) => {
    const startDate = new Date(reservationStartDate);
    let finishDate = new Date(reservationFinishDate);

    // Normaliza ambas fechas a la medianoche, solo se necesita calcular los días
    startDate.setHours(0, 0, 0, 0);
    finishDate.setHours(0, 0, 0, 0);

    if (startDate.getTime() === finishDate.getTime()) {
      // Agrega un día a finishDate
      finishDate.setDate(finishDate.getDate() + 1);
    }

    const differenceInTime = finishDate - startDate;

    // Convertir la diferencia de milisegundos a días
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // 1000 ms/s * 3600 s/h * 24 h/d

    return differenceInDays; // Retornar la cantidad de días
  };

  //sirve para confirmar que no el usuario no se pase de listo y quiera quitar todas las habitaciones
  const isOneRoomSelected = reservationDto?.data?.roomsInfoList?.length === 1;

  const selectedServices =
    reservationDto?.data?.additionalServicesInfoList?.map((service) => ({
      id: service.id,
      price: service.price,
      name: service.name,
    }));

  const handleEditReservation = async (id) => {
    console.log("Aqui se mandaría la peticion al backend", id);
    //IMPORTANTE SI SE DEBE HACER EL MAPEO
    const dto = {
      startDate: reservationDto?.data?.startDate,
      finishDate: reservationDto?.data?.finishDate,
      roomsList: reservationDto?.data?.roomsInfoList.map(
        (element) => element.id
      ),
      additionalServicesList:
        reservationDto?.data?.additionalServicesInfoList.map(
          (element) => element.id
        ),
    };

    try{
      const result = await editReservation(id, dto);

      if(result.status){

        toast.success(result.message)
        navigate("/administrationHotelPage/dashboardHotelPage");
        //queriendo se implementa el useNavigate
      }
      else{
        toast.error(result.message)
      }

    }
    catch(error){
      console.error("Error al editar la reserva:", error);
      toast.error("Error al editar la reserva")
    }
  };

  //suma de habitaciones
  const costRooms = reservationDto?.data?.roomsInfoList?.reduce(
    (acc, { priceNight }) => acc + priceNight,
    0
  );

  //suma de servicios adicionales
  const totalServices =
    reservationDto?.data?.additionalServicesInfoList?.reduce(
      (acc, { price }) => acc + price,
      0
    );

  console.log(reservationDto)

  if (isLoading || !reservationDto) {
    console.log("Desde CIrcularProgress")
    return (
      <div className="flex flex-auto justify-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <Link
        //a medida se coloquen numeros se regresa la cantidad de "nodos" que se especifique
        to={-1}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ChevronLeftIcon className="w-5 h-5" />
        Regresar
      </Link>

      {reservationDto && hotelId ? (
        <section className="border rounded-lg p-6 mb-6 shadow-md bg-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Reserva: {reservationDto?.data?.id}
          </h2>
          <div className="flex justify-between text-gray-600 mb-6">
            <p>Inicio: {formatDate(reservationDto?.data?.startDate)}</p>
            <p>Fin: {formatDate(reservationDto?.data?.finishDate)}</p>
          </div>
          <div className="flex justify-between text-gray-600 mb-6">
            <p>
              Total dias:{" "}
              {calculateDays(
                reservationDto?.data?.startDate,
                reservationDto?.data?.finishDate
              )}
            </p>
          </div>
          <h3 className="text-md font-bold text-gray-700 mb-2">Habitaciones</h3>

          {/* Inicio Lista de habitaciones de reserva */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reservationDto?.data?.roomsInfoList?.map((room) => (
              <RoomReservationCard
                key={room.id}
                room={room}
                onRemove={() => {
                  if (isOneRoomSelected) {
                    toast.warning(
                      "Debes tener al menos una habitación seleccionada"
                    );
                    return;
                  }

                  console.log("aqui debe de quitarse la habitación");
                  //payload que se tenia antes payload: room.roomId,
                  // return dispatch({
                  //   type: UPDATE_RESERVATION_ACTIONS.REMOVE_ROOM,
                  //   payload: room.id,
                  // });
                  onRemoveRoom(room.id)
                }}
              />
            ))}
          </div>
          {/* Fin Lista de habitaciones de reserva */}

          {/* Inicio Lista de SA que cuenta el hotel, ya sea que fueron seleccionados o no */}
          <AdditionalServicesList
            data={additionalServicesByHotelData?.data}
            selectedServices={selectedServices}
            loading={isLoading}
            toggleService={(dto) => {
              // if (dto?.checked) {
              //   dispatch({
              //     type: UPDATE_RESERVATION_ACTIONS.REMOVE_SERVICE,
              //     //OJO CON EL MAPEO DE ESTO: antes estaba: additionalServiceId: dto.id, additionalServicePrice: dto.price, additionalServiceName: dto.name,
              //     payload: {
              //       id: dto.id,
              //       price: dto.price,
              //       name: dto.name,
              //     },
              //   });
              //   return;
              // }

              //SI EL SERVICIO NO ESTA SELECCIONADO
              if(!dto?.checked) {
                const serviceToAdd = {
                  id: dto.id,
                  price: dto.price,
                  name: dto.name,
                }

                onAddService(serviceToAdd);
                return
              }

              // dispatch({
              //   type: UPDATE_RESERVATION_ACTIONS.ADD_SERVICE,
              //   //OJO CON EL MAPEO DE ESTO: antes estaba: additionalServiceId: dto.id, additionalServicePrice: dto.price, additionalServiceName: dto.name,
              //   payload: {
              //     id: dto.id,
              //     price: dto.price,
              //     name: dto.name,
              //   },
              // });

              //SI EL SERVICIO SI ESTA SELECCIONADO
              const servicetoRemove = {
                id: dto.id,
                price: dto.price,
                name: dto.name,
              }
              onRemoveService(servicetoRemove);
            }}
          />
          {/* Fin Lista de SA que cuenta el hotel, ya sea que fueron seleccionados o no */}

          <p className="font-bold mt-4 text-gray-800">
            {/* Total Reserva = ${reservation.reservationPrice} */}
            {/* $ {(costRooms + totalServices) * (daysInterval || 1)} */}
            Total Reserva = $
            {(costRooms + totalServices) *
              calculateDays(
                reservationDto?.data?.startDate,
                reservationDto?.data?.finishDate
              )}
          </p>
        </section>
      ) : (
        <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 transition-colors mb-2">
          <p className="text-blue-700">
            Seleccione una reserva que desee editar
          </p>
        </div>
      )}

      {reservationDto && hotelId && (
        <div>
          <ChangeDatesEditReser
            reservation={reservationDto?.data}
            onChange={onDatesChange}
            state={{
              startDate: reservationDto?.data?.startDate,
              finishDate: reservationDto?.data?.finishDate,
            }}
          />

          <AddRoomsEditReservation
            reservation={reservationDto?.data}
            hotelId={hotelId}
            // onAddRoom={(room) => {
            //   return dispatch({
            //     type: UPDATE_RESERVATION_ACTIONS.ADD_ROOM,
            //     //OJO CON EL MAPEO DE ESTE PAYLOAD, antes estaba => roomId: room.id, roomPriceNight: room.priceNight, roomType: room.typeRoom, ..., roomHotelInfo: firstHotelRoomSelected,
            //     payload: {
            //       id: room.id,
            //       priceNight: room.priceNight,
            //       typeRoom: room.typeRoom,
            //       numberRoom: room.numberRoom,
            //       imageUrl: room.imageUrl,
            //       hotelInfo: firstHotelRoomSelected,
            //     },
            //   });
            // }}
            onAddRoom={(room) => {
              const roomToAdd = {
                id: room.id,
                priceNight: room.priceNight,
                typeRoom: room.typeRoom,
                numberRoom: room.numberRoom,
                imageUrl: room.imageUrl,
                // hotelInfo: firstHotelRoomSelected,   //aqui no existe firstHotelRoomSelected
              }
              onAddRoom(roomToAdd)
            }}
          />
        </div>
      )}

      {/* AGREGAR VALIDACION SIMILAR A LAS ANTERIOR PARA QUE ESTOS BOTONES SOLO SE MUESTREN SI EXISTE INFO */}
      <Button
        variant="contained"
        color="warning"
        disabled={isLoadingEditReservation}
        onClick={() => handleEditReservation(reservationByIdData.data?.id)}
      >
        {isLoadingEditReservation ? "Editando..." : "Editar Reserva"}
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => {
          // dispatch({
          //   type: UPDATE_RESERVATION_ACTIONS.CLEAR_RESERVATION,
          //   payload: {},
          // });
          onResetEditReservation(reservationByIdData);
        }}
        // onClick={onResetEditReservation}
      >
        Reserva inicial
      </Button>
    </>
  );
};

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

{
  /* En el componente que se encarga del mapeo de los SA (tanto las que se seleccionaron como las que estan disponibles)
    se cambió el nombre a EditAdditionalServiceCard */
}
