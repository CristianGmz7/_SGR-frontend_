import { useState } from "react"
import { getAllRoomsByHotelApi } from "../../../shared/actions/rooms/";

export const useRooms = () => {
  
  // ----------------------------------------------------------------------------------------------------------------
  const [roomsByHotelData, setRoomsByHotelData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRoomsByHotel = async (hotelId, page, filterStartDate, filterEndDate, priceMin, priceMax, type) => {
    setIsLoading(true);
    const result = await getAllRoomsByHotelApi(hotelId, page, filterStartDate, filterEndDate, priceMin, priceMax, type);
    setRoomsByHotelData(result)
    setIsLoading(false);
  }

  return {
    roomsByHotelData,
    isLoading,
    error,

    loadRoomsByHotel
  }
}