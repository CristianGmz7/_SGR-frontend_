import { useEffect, useState } from "react";
import { useAdditionalServices } from "../../../client/hooks";
import {
  AdditionalServiceCard,
  CreateAdditionalServiceForm,
  EditAdditionalServiceForm,
} from "../components";
import { Link, useParams } from "react-router-dom";

export const AdditionalServicesPage = () => {
  const { hotelId } = useParams();

  const {
    additionalServicesByHotelData,
    isLoading,
    error,
    loadAdditionalServicesByHotel,
  } = useAdditionalServices();

  useEffect(() => {
    loadAdditionalServicesByHotel(hotelId);
  }, [hotelId]);

  const [isCreatingNewService, setIsCreatingNewService] = useState(false);
  const [isEditingService, setIsEditingService] = useState(null);
  const [isDeletingService, setIsDeletingService] = useState(null);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4 overflow-y-auto">
        <div className="mb-4">
          {!isEditingService && !isDeletingService && (
            <button
              className={`flex items-center px-4 py-2 rounded-md text-white focus:outline-none
                ${
                  isCreatingNewService
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700 "
                }`}
              onClick={() => setIsCreatingNewService(!isCreatingNewService)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              {isCreatingNewService
                ? "Cancelar creación"
                : "Crear Servicio Adicional"}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {additionalServicesByHotelData?.data?.map((service) => (
            <AdditionalServiceCard
              key={service.id}
              service={service}
              setIsEditingService={setIsEditingService}
              isEditingService={isEditingService}
              isCreatingNewService={isCreatingNewService}
              isDeletingService={isDeletingService}
              setIsDeletingService={setIsDeletingService}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4 bg-gray-100">
        {isCreatingNewService && (
          <CreateAdditionalServiceForm hotelId={hotelId} />
        )}
        {isEditingService && (
          <>
            <AdditionalServiceCard isPreview={true} service={isEditingService}/>
            <EditAdditionalServiceForm isEditingService={isEditingService}/>
          </>
        )}
      </div>
    </div>
  );
};
