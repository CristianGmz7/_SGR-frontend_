import { useState } from "react";
import { createReservationApi } from "../../../shared/actions/reservations/reservations.action";

export const useReservations = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // ----------------------------------------------------------------------------------------------------------------

  const createReservation =  async (reservationData) => {
    try {
      setIsLoading(true);
      const result = await createReservationApi(reservationData)
      return result;

    } catch (error) {
      console.error("Error al crear la cuenta:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------


  return {
    isLoading,
    error,

    createReservation
  }
}