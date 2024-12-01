import { useParams } from "react-router-dom"
import { formatDate } from "../../../../shared/utils/format-date";
import { AdditionalServicesList, AddRoomsEditReservation, ChangeDatesEditReser, RoomReservationCard } from "../../../client/components";
import { useAdditionalServices, useReservations, useSinglePagination } from "../../../client/hooks";

import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useReservations as useReservationsAdminHotel } from "../hooks";
import { useEffect, useState } from "react";
import { useCreateReservation } from "../contexts/reservationCreateContext";    //para ver el info del usuario asi como obtener el hotelId

export const EditReservationPage = () => {

  const { hotelId, clientToReservation } = useCreateReservation()

  const { reservationId } = useParams();
  const { reservationByIdData, isLoading, error, loadReservationById } = useReservationsAdminHotel()

  const [reservationDto, setReservationDto] = useState(null);

  const { additionalServicesByHotelData, isLoading:isLoadingAdditionalServices, 
    error:errorAdditionalServices, loadAdditionalServicesByHotel } = useAdditionalServices();

  useEffect(() => {
    loadReservationById(reservationId);
    setReservationDto(reservationByIdData?.data)
  }, [reservationId])

  useEffect(() => {
    if (reservationByIdData?.data) {
      setReservationDto(reservationByIdData);
    }
  }, [reservationByIdData]);
;
  
    const { setFetching } = useSinglePagination(loadAdditionalServicesByHotel, hotelId);

    const { editReservation, isLoading:isLoadingEditReservation, error:errorEditReservation} = useReservations();

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

  if (isLoading || !reservationDto) {
    return (
      <div className="flex flex-auto justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>EditReservationPage</div>
  )
}

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
