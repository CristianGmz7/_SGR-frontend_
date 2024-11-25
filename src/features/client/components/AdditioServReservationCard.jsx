export const AdditioServReservationCard = ({ aS }) => {
  
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 transition-colors mb-2">
      <p className="text-blue-700">Nombre servicio: {aS.name}</p>
      <p className="text-blue-600">Precio: ${aS.price}</p>
    </div>
  );
};
