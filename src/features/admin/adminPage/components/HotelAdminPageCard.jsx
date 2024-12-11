import { StarAdminPageIcon } from '../../../../shared/svgs'

export const HotelAdminPageCard = ({hotel, selectedHotel, setSelectedHotel}) => {

  const isSelected = selectedHotel?.id === hotel.id;

  const handleButtonClick = () => {
    if (isSelected) {
      setSelectedHotel(null); // Reiniciar si ya está seleccionado
    } else {
      setSelectedHotel(hotel); // Seleccionar el hotel
    }
  };

  return (
    <div key={hotel.id} className="mb-4 flex border border-gray-200 rounded-md shadow-sm">
    <div className="p-4 flex-grow flex">
      {/* Imagen del hotel */}
      <img
        src={hotel.imageUrl}
        alt={hotel.name}
        className="w-24 h-24 object-cover rounded-md mr-4"
      />
      <div>
        {/* Estrellas */}
        <div className="flex mb-1">
          {[...Array(hotel.starsMichelin)].map((_, i) => (
            <StarAdminPageIcon key={i}/>
          ))}
        </div>

        {/* Información del hotel */}
        <h3 className="font-bold text-lg">{hotel.name}</h3>
        <p className="font-bold ">{hotel.numberPhone}</p>
        <p className="text-sm text-gray-600">{hotel.address}</p>
        <p className="text-sm text-gray-800">{hotel.overview}</p>
      </div>
    </div>

    {/* Botón para borrar */}
    <button 
      className={`self-center mr-4 font-semibold py-2 px-4 rounded-md ${
        isSelected
          ? "bg-orange-500 text-white hover:bg-orange-600"
          : "bg-gray-300 text-gray-800 hover:bg-red-600"
      }`}
      onClick={handleButtonClick}
    >
      {isSelected ? "Cancelar" : "Borrar"}
    </button>
  </div>
  )
}
