import { useState } from "react";
import { createRoomApi, getAllRoomsByAdminHotelApi } from "../../../../shared/actions/rooms"

export const useRooms = () => {
  const [roomsData, setRoomsData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRoomsHotelData = async (id, searchTerm, page) => {
    setIsLoading(true);
    const result = await getAllRoomsByAdminHotelApi(id, searchTerm, page);
    setRoomsData(result);
    setIsLoading(false);
  }

  // ----------------------------------------------------------------------------------------------------------------

  const createRoom = async (body) => {
    try{
      setIsLoading(true);
      const result = await createRoomApi(body);
      return result;
    }
    catch(error){
      console.error("Error al crear la cuenta:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------


  return {
    roomsData,
    isLoading,
    error,

    loadRoomsHotelData,
    createRoom
  }
}
