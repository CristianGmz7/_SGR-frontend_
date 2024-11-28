import { useState } from "react";
import { editHotelApi, getHotelByIdApi } from "../../../../shared/actions/hotels/hotels.action";

export const useHotels = () => {

  const [hotelData, setHotelData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHotelData = async (id) => {
    setIsLoading(true);
    const result = await getHotelByIdApi(id);
    setHotelData(result);
    setIsLoading(false);
  }

  // ----------------------------------------------------------------------------------------------------------------

  const editHotel = async (id, body) => {
    try {
      setIsLoading(true);
      const result = await editHotelApi(id, body)
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
    hotelData,
    isLoading,
    error,

    loadHotelData,
    editHotel
  }
}
