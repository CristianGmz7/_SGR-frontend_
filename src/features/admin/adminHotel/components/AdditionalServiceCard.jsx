import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAdditionalServices } from "../hooks";

export const AdditionalServiceCard = ({
  service,
  setIsEditingService,
  isEditingService,
  isPreview = false,
  isCreatingNewService = false,
  isDeletingService,
  setIsDeletingService,
}) => {

  const navigate = useNavigate();
  const { isLoading, error, deleteAdditionalService } = useAdditionalServices();
  
  const handleEditService = () => {
    if (isEditingService?.id === service.id) {
      setIsEditingService(null);
    } else {
      setIsEditingService(service);
    }
  };

  const handleToggleDeleteService = () => {
    if (isDeletingService?.id === service.id) {
      setIsDeletingService(null);
    } else {
      setIsDeletingService(service);
    }
  };

  const handleConfirmDeleteService = async (id) => {
    console.log("SA eliminado:", id);

    try{
      const result = await deleteAdditionalService(id);
  
      if(result.status){
        toast.success("Servicio Adicional eliminado correctamente")
        navigate('/administrationHotelPage/dashboardHotelPage');
      }else{
        toast.error(result.message);
      }
    }
    catch(error){
      console.error("Error al eliminar el servicio adicional:", error);
    }
  }

  return (
    <div className="border rounded-md shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{service.name}</h3>
        <p className="text-2xl font-semibold">$ {service.price}</p>
      </div>
      <div className="flex justify-between p-4 border-t">
        {
          isPreview ? (
            <></>
          ) : isEditingService?.id === service.id ? (
            <>
              <button
                className="flex items-center px-3 py-1 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none"
                onClick={handleEditService}
              >
                Cancelar
              </button>
            </>
          ) : isCreatingNewService ? (
            <></>
          ) : isDeletingService?.id === service.id ? (
            <>
              <button
                className="flex items-center px-3 py-1 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none"
                onClick={handleToggleDeleteService}
              >
                Cancelar
              </button>
              <button 
                className="flex items-center px-3 py-1 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none"
                onClick={() => handleConfirmDeleteService(service.id)}
              >
                Confirmar
              </button>
            </>
          ) : (
            <>
              <button
                className="flex items-center px-3 py-1 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none"
                onClick={handleEditService}
              >
                Editar
              </button>
              <button 
                className="flex items-center px-3 py-1 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none"
                onClick={handleToggleDeleteService}
              >
                Eliminar
              </button>
            </>
          )
        }
      </div>
    </div>
  );
};
