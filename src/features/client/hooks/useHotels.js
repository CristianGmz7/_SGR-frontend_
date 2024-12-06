import { useState } from "react"
import { getAllHotelsApi, getAllHotelsForUsersApi } from "../../../shared/actions/hotels/hotels.action";

export const useHotels = () => {
  // ----------------------------------------------------------------------------------------------------------------
  const [hotelsData, setHotelsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHotelsData = async (searchTerm, page = 1, starsNumber = 0, department = "", city = "", minLikes = -1, maxLikes = -1) => {
    setIsLoading(true);
    // const result = await getAllHotelsApi(searchTerm, page);
    const result = await getAllHotelsForUsersApi(searchTerm, page, starsNumber, department, city, minLikes, maxLikes)
    setHotelsData(result);
    setIsLoading(false);
  }
  
  // ----------------------------------------------------------------------------------------------------------------
  return {
    hotelsData,
    isLoading,
    error,

    loadHotelsData

  }
}