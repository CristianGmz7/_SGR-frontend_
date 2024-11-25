
//onRemove permite saber si se trata de cuando se quiere quitar de la edición o no
export const RoomReservationCard = ({ room, onRemove }) => (
  <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 transition-colors">
    <img
      src={room.imageUrl}
      alt={`Habitación ${room.id}`}
      className="rounded-lg mb-2 w-full h-auto"
      style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
    />
    <p className="text-blue-700">Habitación {room.numberRoom}</p>
    <p className="text-blue-600">{room.typeRoom}</p>
    <p className="text-blue-600">${room.priceNight}</p>
    <p className="text-blue-600">{room.hotelInfo.name}</p>
    {onRemove && (
      <button
        onClick={() => onRemove(room.id)}
        className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2"
      >
        Borrar
      </button>
    )}
  </div>
);
