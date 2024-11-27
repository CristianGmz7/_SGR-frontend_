import { useState } from "react"
import { getAllHotelsApi } from "../../../shared/actions/hotels/hotels.action";

export const useHotels = () => {
  // ----------------------------------------------------------------------------------------------------------------
  const [hotelsData, setHotelsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHotelsData = async (searchTerm, page = 1) => {
    setIsLoading(true);
    const result = await getAllHotelsApi(searchTerm, page);
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