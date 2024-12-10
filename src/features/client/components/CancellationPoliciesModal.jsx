export const CancellationPoliciesModal = ({ visible, onClose }) => {
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Políticas de cancelación
        </h1>
        <p className="text-gray-700 text-justify mb-4">
          Un usuario puede cancelar sus reservas siempre y cuando lo haga antes de la fecha y hora de inicio. Los administradores de hoteles pueden cancelar reservas previa autorización del usuario y notificación adecuada.
        </p>
        <p className="text-gray-700 text-justify mb-4">
          Habitaciones o servicios adicionales solo pueden ser cancelados si no están asociados con reservas confirmadas o futuras.
        </p>
        <p className="text-gray-700 text-justify">
          Los administradores de página pueden cancelar un hotel por conflictos mayores o a solicitud del administrador del hotel, asegurándose de no tener reservas futuras activas.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
