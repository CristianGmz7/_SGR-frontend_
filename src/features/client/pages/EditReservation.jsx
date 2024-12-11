import { formatDate } from "../../../shared/utils/format-date";
import { UPDATE_RESERVATION_ACTIONS, useEditReservation } from "../contexts";
import { AdditionalServicesList, AddRoomsEditReservation, ChangeDatesEditReser, RoomReservationCard } from "../components";
import { useAdditionalServices, usePaypal, useReservations, useSinglePagination } from "../hooks";

import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { PayPalCheckoutEdit } from "../paypal";
import { useEffect, useState } from "react";

export const EditReservation = () => {
  const { state: reservation, dispatch, defaultState } = useEditReservation();
  const { isLoading:loadingRefund, error:errorRefund, createRefund } = usePaypal();

  const navigate = useNavigate();

  const firstHotelRoomSelected =
    defaultState?.roomsInfoList?.at(0)?.hotelInfo;

  // console.log("firstHotelRoomSelected", firstHotelRoomSelected);

  const { additionalServicesByHotelData, isLoading, 
    error:errorAdditionalServices, loadAdditionalServicesByHotel } = useAdditionalServices();
  
  const { setFetching } = useSinglePagination(loadAdditionalServicesByHotel, firstHotelRoomSelected.id);

  //verificar la correcta implementación
  const { editReservation, isLoading:isLoadingEditReservation, error} = useReservations();

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

  const onDatesChange = (newDates) => {
    dispatch({
      type: UPDATE_RESERVATION_ACTIONS.UPDATE_DATES,
      payload: newDates,
    });
  };

  //con esta variable se verifica que exista al menos una habitación mientras se edita la reserva
  const isOneRoomSelected = reservation?.roomsInfoList?.length === 1;

  const selectedServices =
    reservation?.additionalServicesInfoList?.map((service) => ({
      id: service.id,
      price: service.price,
      name: service.name,
    }));

  //aqui se hace la petición al action para editar
  const handleEditReservation = async (id, orderId, captureId) => {
    const dto = {
      startDate: reservation?.startDate,
      finishDate: reservation?.finishDate,
      roomsList: reservation?.roomsInfoList.map(
        (element) => element.id
      ),
      additionalServicesList:
        reservation?.additionalServicesInfoList.map(
          (element) => element.id
        ),
        orderId: orderId,
        captureId: captureId
    };

    try{
      const result = await editReservation(id, dto);
      
      if(result.status){

        toast.success(result.message)
        navigate('/yourReservations');
        //si no funciona la creación probar a hacer el reembolso
      }
      else{
        toast.error(`${result.message}... Generando reembolso de la edición`)
        const result = await createRefund({captureId: captureId, reason: ""})
        //inicio de lo del reembolso
        try{
          const result = await createRefund({captureId: captureId, reason: ""})
          if(result.status){
            toast.success("Reembolso de la edición creado con éxito");
          }
          else{
            toast.error("Error al crear el reembolso de la edición, pongase en contacto con el administrador del hotel");
          }
        }
        catch(error){
          console.error("Error al crear el reembolso de la edición:", error);
          toast.error("Ocurrió un error al crear el reembolso de la edición, , pongase en contacto con el administrador del hotel");
        }
        //fin de lo del reembolso
      }

    }
    catch(error){
      console.error("Error al editar la reserva:", error);
      toast.error("Error al editar la reserva")
    }
  };

  //suma de habitaciones
  const costRooms = reservation?.roomsInfoList?.reduce(
    (acc, { priceNight }) => acc + priceNight, 0
  );

  //suma de servicios adicionales
  const totalServices =
    reservation?.additionalServicesInfoList?.reduce(
      (acc, { price }) => acc + price, 0
  );

  const [totalReservation, setTotalReservation] = useState(); 
  useEffect(() => {
    setTotalReservation(parseFloat((costRooms + totalServices) * (calculateDays(reservation?.startDate, reservation?.finishDate) || 1)).toFixed(2))
  }, [costRooms, totalServices, reservation?.startDate, reservation?.finishDate])

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

      {Object.keys(reservation || []).length > 0 ? (
        // esto evalua que reservation tenga al menos una key y no sea un objeto vacio
        <section className="border rounded-lg p-6 mb-6 shadow-md bg-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Reserva: {reservation?.id}
          </h2>
          <div className="flex justify-between text-gray-600 mb-6">
            <p>Inicio: {formatDate(reservation?.startDate)}</p>
            <p>Fin: {formatDate(reservation?.finishDate)}</p>
          </div>
          <div className="flex justify-between text-gray-600 mb-6">
            <p>
              Total dias:{" "}
              {calculateDays(
                reservation?.startDate,
                reservation?.finishDate
                // defaultState
              )}
            </p>
          </div>
          <h3 className="text-md font-bold text-gray-700 mb-2">Habitaciones</h3>

          {/* Card de Lista de habitaciones de reserva */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reservation?.roomsInfoList?.map((room) => (
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

                  //payload que se tenia antes payload: room.roomId,
                  return dispatch({
                    type: UPDATE_RESERVATION_ACTIONS.REMOVE_ROOM,
                    payload: room.id,
                  });
                }}
              />
            ))}
          </div>
          
          <AdditionalServicesList
            data={additionalServicesByHotelData?.data}
            toggleService={(dto) => {
              if (dto?.checked) {
                dispatch({
                  type: UPDATE_RESERVATION_ACTIONS.REMOVE_SERVICE,
                  //OJO CON EL MAPEO DE ESTO: antes estaba: additionalServiceId: dto.id, additionalServicePrice: dto.price, additionalServiceName: dto.name,
                  payload: {
                    id: dto.id,
                    price: dto.price,
                    name: dto.name,
                  },
                });
                return;
              }

              dispatch({
                type: UPDATE_RESERVATION_ACTIONS.ADD_SERVICE,
                //OJO CON EL MAPEO DE ESTO: antes estaba: additionalServiceId: dto.id, additionalServicePrice: dto.price, additionalServiceName: dto.name,
                payload: {
                  id: dto.id,
                  price: dto.price,
                  name: dto.name,
                },
              });
            }}
            
            selectedServices={selectedServices}
            loading={isLoading}
          />

          <p className="font-bold mt-4 text-gray-800">
            {/* Total Reserva = ${reservation.reservationPrice} */}
            {/* $ {(costRooms + totalServices) * (daysInterval || 1)} */}
            Total Reserva = $
              {totalReservation}
          </p>
        </section>
      ) : (
        <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 transition-colors mb-2">
          <p className="text-blue-700">
            Seleccione una reserva que desee editar
          </p>
        </div>
      )}

      {reservation && (
        <div>
          <ChangeDatesEditReser
            reservation={reservation}
            onChange={onDatesChange}
            state={{
              startDate: reservation?.startDate,
              finishDate: reservation?.finishDate,
            }}
          />
          {/* <AddAdditioSerEditReservation reservation={reservation} /> */}

          <AddRoomsEditReservation
            reservation={reservation}
            onAddRoom={(room) => {
              return dispatch({
                type: UPDATE_RESERVATION_ACTIONS.ADD_ROOM,
                //OJO CON EL MAPEO DE ESTE PAYLOAD, antes estaba => roomId: room.id, roomPriceNight: room.priceNight, roomType: room.typeRoom, ..., roomHotelInfo: firstHotelRoomSelected,
                payload: {
                  id: room.id,
                  priceNight: room.priceNight,
                  typeRoom: room.typeRoom,
                  numberRoom: room.numberRoom,
                  imageUrl: room.imageUrl,
                  hotelInfo: firstHotelRoomSelected,
                },
              });
            }}
          />
        </div>
      )}

      <Button
        variant="contained"
        color="info"
        onClick={() => {
          dispatch({
            type: UPDATE_RESERVATION_ACTIONS.CLEAR_RESERVATION,
            payload: {},
          });
        }}
      >
        Reserva inicial
      </Button>
      {/* <Button
        variant="contained"
        color="warning"
        disabled={isLoadingEditReservation}
        onClick={() => handleEditReservation(reservation.id)}
      >
        {isLoadingEditReservation ? "Editando..." : "Editar Reserva"}
      </Button> */}
      <PayPalCheckoutEdit total={totalReservation} functionAfterPaying={handleEditReservation} reservationId={reservation.id}/>
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
