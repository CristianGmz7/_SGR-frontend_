export const HighlightedFeaturesModal = ({ visible, onClose }) => {
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
          Características destacadas de Hondu Reservas
        </h1>
        <p className="text-gray-700 text-justify mb-4">
          Hondu Reservas es una aplicación que te ayuda a administrar tus reservas, permitiéndote encontrar los hoteles registrados en nuestra página según tu conveniencia. Los usuarios pueden administrar sus reservas hechas desde la página, lo que les da más comodidad para realizar cambios o cancelarlas.
        </p>
        <p className="text-gray-700 text-justify mb-4">
          Los administradores de hoteles pueden gestionar reservas de otros usuarios, crear, editar o eliminar habitaciones y servicios adicionales, y realizar gestiones para publicar hoteles nuevos.
        </p>
        <p className="text-gray-700 text-justify">
          ¡Y muchas más características novedosas y provechosas te esperan en Hondu Reservas!
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
