import { useEffect, useState } from "react";
import { createHotelReactApi, deleteHotelReactApi, editHotelReactApi, getHotelReactByHotelAndUser } from "../../../shared/actions/hotelsReacts/hotelsReacts.action";

export const useHotelsReacts = () => {
  const [reactions, setReactions] = useState({
    likeActive: false,
    unLikeActive: false
  });

  const [hotelReactData, setHotelReactData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadHotelReact = async (hotelId, isAuthenticated) => {
    setIsLoading(true);
    const isAuthenticatedToApi = isAuthenticated ? "ISAUTHENTICATED" : "NOISAUTHENTICATED"
    const result = await getHotelReactByHotelAndUser(hotelId, isAuthenticatedToApi);
    setHotelReactData(result);
    setIsLoading(false);
  }
  
  //setear data de reactions, cual va a estar true o false
  useEffect(() => {
    if(hotelReactData?.data){

      if(hotelReactData?.data?.action === "NOUSER" || hotelReactData?.data?.action === "NONE"){
        setReactions((prev) => ({
          ...prev,
          likeActive: false,
          unLikeActive: false
        }))
      }

      if(hotelReactData?.data?.action === "LIKED"){
        setReactions((prev) => ({
          ...prev,
          likeActive: true,
          unLikeActive: false
        }))
      }

      if(hotelReactData?.data?.action === "UNLIKED"){
        setReactions((prev) => ({
          ...prev,
          likeActive: false,
          unLikeActive: true
        }))
      }

    }
  }, [hotelReactData])
  

  // ----------------------------------------------------------------------------------------------------------------

  //es muy probable que se haga uso de la respuesta para retornar o mapear lo del reactions
  const createHotelReact = async (hotelId, action) => {
    try {
      setIsLoading(true);
      const body = {
        hotelId: hotelId,
        action: action
      }
      const result = await createHotelReactApi(body)
      return result;

    } catch (error) {
      console.error("Error al crear la reacción:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------

  const editHotelReact = async (hotelId, action) => {
    try {
      setIsLoading(true);
      const body = {
        hotelId: hotelId,
        action: action
      }
      const result = await editHotelReactApi(body)
      return result;

    } catch (error) {
      console.error("Error al editar la reacción:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------

  const deleteHotelReact = async (hotelId, action) => {
    try {
      setIsLoading(true);
      const result = await deleteHotelReactApi(hotelId, action)
      return result;

    } catch (error) {
      console.error("Error al editar la reacción:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------

  return {
    reactions,
    isLoading,
    error,

    loadHotelReact,
    createHotelReact,
    editHotelReact,
    deleteHotelReact,
    setReactions
  }
}