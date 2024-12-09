//Componente que renderiza una tarjeta con la información de una habitación individual en la pagina que muestre
//la lista de habitaciones

import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom"

//room es la data del room que acaba se acaba de recibir del .map
//isRoomSelected
//toggleRoomSelection
export const RoomCard = ({
  room,
  isRoomSelected,
  toggleRoomSelection,
  isAuthenticated,
}) => {
  return (
    <div key={room.id} className="grid gap-4 relative group">
      <img
        src={room.imageUrl}
        alt={`Room ${room.id}`}
        width="300"
        height="300"
        className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
      />
      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Habitación {room.numberRoom}</div>
          <div className="text-xs text-muted-foreground">{room.typeRoom}</div>
        </div>
        <div className="font-semibold text-gray-700 text-sm">
          ${room.priceNight} / noche
        </div>
        {isAuthenticated ? (
          <Button
            variant="contained"
            //se le manda el id de la hab si la habitación esta selecciona devuelve TRUE por lo que se elimina de la lista
            color={isRoomSelected(room.id) ? "error" : "success"}
            //   queda pendiente explicación de esta función
            onClick={() => toggleRoomSelection(room)}
          >
            {isRoomSelected(room.id) ? "Cancelar reserva" : "Agregar a Reserva"}
          </Button>
        ) : (
          <div className="text-center text-blue-600 font-medium">
            <Link
              to="/security/login"
              className="hover:underline cursor-pointer transition-colors hover:text-blue-800"
            >
              Inicia sesión{" "}
            </Link>
            o{" "}
            <Link
              to="/security/register"
              className="hover:underline cursor-pointer transition-colors hover:text-blue-800"
            >
              Regístrate
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};