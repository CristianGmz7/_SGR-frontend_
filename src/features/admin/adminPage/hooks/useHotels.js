import { useState } from "react";
import { createHotelApi, deleteHotelApi } from "../../../../shared/actions/hotels/hotels.action";

export const useHotels = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createHotel = async (hotelDto) => {
    try{
      setIsLoading(true);
      const result = await createHotelApi(hotelDto);
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
  
  const deleteHotel = async (id) => {
    try{
      setIsLoading(true);
      const result = await deleteHotelApi(id);
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
    isLoading,
    error,

    createHotel,
    deleteHotel
  }
}