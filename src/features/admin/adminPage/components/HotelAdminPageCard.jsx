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
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-yellow-400 mr-1"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.932 1.426 8.315-7.362-3.968-7.362 3.968 1.426-8.315-6.064-5.932 8.332-1.151z" />
            </svg>
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
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
      onClick={handleButtonClick}
    >
      {isSelected ? "Cancelar" : "Borrar"}
    </button>
  </div>
  )
}
