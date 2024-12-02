import { toast } from "react-toastify";

export const HotelDetail = ({selectedHotel, setSelectedHotel, setFetching, deleteHotel}) => {

  const handleDeleteHotel = async (id) => {

    try{
      console.log(id);
      const result = await deleteHotel(id);
  
      if(result.status){
        toast.success("Hotel eliminado correctamente")
        setFetching(true);
        setSelectedHotel(null);
      }else{
      toast.error(result.message);
      }
    }
    catch(error){
      console.error("Error al eliminar el hotel:", error);
    }
  }

  if (!selectedHotel) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-2xl font-semibold">
        Previsualización de Hotel a Eliminar
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 h-full">
      <div className="h-full overflow-y-auto">
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="p-6">
            <img
              src={selectedHotel.imageUrl}
              alt={selectedHotel.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <div className="flex mb-2">
              {[...Array(selectedHotel.starsMichelin)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedHotel.name}</h2>
            <p className="text-gray-500 mb-2">{selectedHotel.address}</p>
            <p className="font-semibold ">{selectedHotel.numberPhone}</p>
            <p className="font-semibold mb-2">{selectedHotel.overview}</p>
            <p className="text-sm text-gray-700">{selectedHotel.description}</p>
          </div>
          <div className="p-4">
            <button
              className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-md"
              onClick={() => handleDeleteHotel(selectedHotel.id)}
            >
              Eliminar Hotel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
