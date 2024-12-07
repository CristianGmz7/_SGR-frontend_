import { useState } from "react";
import { createReservationApi, deleteReservationApi, editReservationApi, getAllReservationsByClientApi } from "../../../shared/actions/reservations/reservations.action";

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
      console.error("Error al crear la reservación:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------

  const [reservationsByClientData, setReservationsByClientData] = useState({})
  const loadReservationsByClient = async (page, clientId) => {
    setIsLoading(true);
    const result = await getAllReservationsByClientApi(page, clientId);
    setReservationsByClientData(result);
    setIsLoading(false);
  }

  // ----------------------------------------------------------------------------------------------------------------

  const deleteReservation = async (id) => {
    try {
      setIsLoading(true);
      const result = await deleteReservationApi(id)
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

  const editReservation = async (id, body) => {
    try {
      setIsLoading(true);
      const result = await editReservationApi(id, body)
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
    reservationsByClientData,

    createReservation,
    loadReservationsByClient,
    deleteReservation,
    editReservation
  }
}