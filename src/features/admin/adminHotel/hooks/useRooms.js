import { useState } from "react";
import { createRoomApi, deleteRoomApi, editRoomApi, getAllRoomsByAdminHotelApi, getRoomByIdApi } from "../../../../shared/actions/rooms"

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
  const [roomData, setRoomData] = useState({});
  const loadRoomData = async (id) => {
    setIsLoading(true);
    const result = await getRoomByIdApi(id);
    setRoomData(result);
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
      console.error("Error al crear la habitación:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------

  const editRoom = async (id, body) => {
    try{
      setIsLoading(true);
      const result = await editRoomApi(id, body);
      return result;
    }
    catch(error){
      console.error("Error al editar la reservación:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------

  const deleteRoom = async (id) => {
    try{
      setIsLoading(true);
      const result = await deleteRoomApi(id);
      return result;
    }
    catch(error){
      console.error("Error al eliminar la reservación:", error);
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
    roomData,

    loadRoomsHotelData,
    createRoom,
    loadRoomData,
    editRoom,
    deleteRoom
  }
}
