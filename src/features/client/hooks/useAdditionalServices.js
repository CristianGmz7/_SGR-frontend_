import { useState } from "react";
import { getAdditionalServicesByHotelApi } from "../../../shared/actions/additionalServices/additionalServices.action";

export const useAdditionalServices = () => {
  // ----------------------------------------------------------------------------------------------------------------
  const [additionalServicesByHotelData, setAdditionalServicesByHotelData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAdditionalServicesByHotel = async (hotelId) => {
    setIsLoading(true);
    const result = await getAdditionalServicesByHotelApi(hotelId);
    setAdditionalServicesByHotelData(result);
    setIsLoading(false);
  }

  // console.log(additionalServicesByHotelData);
  // ----------------------------------------------------------------------------------------------------------------
  return {
    additionalServicesByHotelData,
    isLoading,
    error,

    loadAdditionalServicesByHotel
  }
}