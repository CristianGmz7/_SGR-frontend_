import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../security/store";
import { FaHotel } from "react-icons/fa6";
import { BsFillSuitcase2Fill } from "react-icons/bs";

export const CreateHotelAfterRegisterModal = ({visible, onClose}) => {

  const validateAuthentication = useAuthStore((state) => state.validateAuthentication);

  const navigate = useNavigate();
  
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "containerUserChoose") onClose();
  };

  const handleHotelChoose = () => {
    validateAuthentication();
    onClose();
    navigate("/createHotel");
  }

  return (
    <div 
    id="container" 
    className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
  >
    <div className="bg-white p-4 rounded">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">¿Qué rol quieres ser?</h1>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
        <div className="w-full md:w-1/2 max-w-sm cursor-pointer hover:shadow-lg transition-shadow border rounded-lg">
          <div className="border-b px-4 py-2">
            <h2 className="text-lg font-semibold">Administrador de Hotel</h2>
          </div>
          <div
            onClick={handleHotelChoose}
            className="flex flex-col items-center text-center px-4 py-6"
          >
            <FaHotel className="w-24 h-24 mb-4 text-primary" />
            <p>
              Crea tu hotel y haz que la gente empiece a reservar en tu hotel
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 max-w-sm cursor-pointer hover:shadow-lg transition-shadow border rounded-lg">
          <div className="border-b px-4 py-2">
            <h2 className="text-lg font-semibold">Usuario</h2>
          </div>
          <div 
            id="containerUserChoose"
            onClick={handleOnClose} 
            className="flex flex-col items-center text-center px-4 py-6"
          >
            <BsFillSuitcase2Fill className="w-24 h-24 mb-4 text-primary" />
            <p>
              Comienza a explorar hoteles y a realizar reservas para tus viajes
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
}
