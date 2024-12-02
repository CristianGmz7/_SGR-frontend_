import { useState } from "react";
import { getHotelIdNameApi } from "../../../../shared/actions/dashboardAdminHotel/dashboardAdminHotel.action"

export const useDashboardAdminHotel = () => {

  const [hotelIdNameData, setHotelIdNameData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHotelIdName = async () => {
    setIsLoading(true);
    const result = await getHotelIdNameApi();
    setHotelIdNameData(result)
    setIsLoading(false);
  }

  return {
    hotelIdNameData,
    isLoading,
    error,

    loadHotelIdName
  }

}
