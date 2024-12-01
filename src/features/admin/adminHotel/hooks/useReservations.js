import { useState } from "react";
import { getAllReservationsByHotelApi, getReservationByIdApi } from "../../../../shared/actions/reservations/reservations.action";

export const useReservations = () => {
  const [reservationsByHotelData, setReservationsByHotelData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadReservationsByClient = async (hotelId, page) => {
    setIsLoading(true);
    const result = await getAllReservationsByHotelApi(hotelId, page);
    setReservationsByHotelData(result);
    setIsLoading(false);
  }

  //obtener por id, porque crear, editar y borrar ya estan en el hook de client
  const [reservationByIdData, setReservationByIdData] = useState({})
  const loadReservationById = async (id) => {
    setIsLoading(true);
    const result = await getReservationByIdApi(id);
    setReservationByIdData(result);
    setIsLoading(false);
  }

  return {
    reservationsByHotelData,
    isLoading,
    error,
    reservationByIdData,

    loadReservationsByClient,
    loadReservationById
  }
}
