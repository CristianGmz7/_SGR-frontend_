//Componente que renderiza una tarjeta con la información de una habitación individual en la pagina que muestre
//la lista de habitaciones

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

//room es la data del room que acaba se acaba de recibir del .map
//isRoomSelected
//toggleRoomSelection
export const RoomCard = ({ room, isEditingOrCreating = false }) => {
  return (
    <div className="grid gap-4 relative group">
      <img
        src={room.imageUrl}
        alt={ isEditingOrCreating ? 
            "No hay previsualizacion de la img " + `Habitación ${room.numberRoom}` :
            `Habitación ${room.id}`
            }
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
        {isEditingOrCreating ? (
          <></>
        ) : (
          <>
            <Button
              variant="contained"
              color={"warning"}
              //falta onclick
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color={"error"}
              //falta onclick
            >
              Eliminar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
