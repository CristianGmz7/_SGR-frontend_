export const CancellationPoliciesModal = ({visible, onClose}) => {
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
      <div className="bg-white p-4 rounded">
        <h1>Datos de la politica de cancelación</h1>
        <p className="text-center text-gray-700 mb-5">Describir las politicas de cancelacion</p>
      </div>
    </div>
  )
}
