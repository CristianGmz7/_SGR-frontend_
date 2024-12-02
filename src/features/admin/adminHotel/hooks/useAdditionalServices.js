import { useState } from "react";
import { createAdditionalServiceApi, deleteAdditionalServiceApi, editAdditionalServiceApi } from "../../../../shared/actions/additionalServices/additionalServices.action";


export const useAdditionalServices = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAdditionalService = async (body) => {
    try{
      setIsLoading(true);
      const result = await createAdditionalServiceApi(body);
      return result;
    }
    catch(error){
      console.error("Error al crear el servicio adicional:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------

  const editAdditionalService = async (id, body) => {
    try{
      setIsLoading(true);
      const result = await editAdditionalServiceApi(id, body);
      return result;
    }
    catch(error){
      console.error("Error al editar el servicio adicional:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------

  
  const deleteAdditionalService = async (id) => {
    try{
      setIsLoading(true);
      const result = await deleteAdditionalServiceApi(id);
      return result;
    }
    catch(error){
      console.error("Error al borrar el servicio adicional:", error);
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

    createAdditionalService,
    editAdditionalService,
    deleteAdditionalService
  }
}
