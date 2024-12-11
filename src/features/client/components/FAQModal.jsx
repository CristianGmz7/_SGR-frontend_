export const FAQModal = ({ visible, onClose }) => {
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
          Preguntas Frecuentes
        </h1>
        <ul className="text-gray-700 space-y-3 list-disc list-inside">
          <li>
            <strong>¿Puedo crear reservas sin cuenta?</strong> No. Es necesario tener una cuenta para comenzar a reservar, un proceso fácil, seguro y gratuito.
          </li>
          <li>
            <strong>¿Cómo puedo añadir mi hotel?</strong> Puedes hacerlo al registrarte como administrador o más adelante con ayuda de los administradores de la página.
          </li>
          <li>
            <strong>¿Qué información puedo modificar?</strong> Puedes actualizar tu nombre, apellidos y foto de perfil siempre que cumpla con las políticas de la página.
          </li>
          <li>
            <strong>¿Qué métodos de pago aceptan?</strong> Actualmente aceptamos tarjetas de débito/crédito y pagos a través de PayPal.
          </li>
        </ul>
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
