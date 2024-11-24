import { CircularProgress } from "@mui/material";
import { AdditionalServiceCard } from "./AdditionalServiceCard";

export const AdditionalServicesList = ({
  data,
  toggleService,
  selectedServices,
  loading,
}) => {

  if (data?.length === 0 && !loading) {
    return (
      <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-gray-50 transition-colors mb-2">
        <p className="text-gray-700">
          No hay servicios adicionales para esta reserva
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card de Lista de servicios adicionales de reserva */}
      <h3 className="text-md font-bold mt-4 text-gray-700 mb-2">
        Servicios Adicionales
      </h3>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        data?.map(({ id, name, price }) => (
          <AdditionalServiceCard
            key={id}
            id={id}
            name={name}
            price={price}
            checked={selectedServices.some((service) => service.id === id)}
            toggleService={toggleService}
          />
        ))
      )}
    </div>
  );
};