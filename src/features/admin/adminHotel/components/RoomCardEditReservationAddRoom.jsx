import { Button } from "@mui/material";

// onAdd es onAddRoom que viene del useEditReservation que se fue pasando por los distintos componentes padres
export const RoomCardEditReservationAddRoom = ({ room,onAdd }) => {
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
        <Button
          variant="contained"
          onClick={onAdd}
        >
          {/* {isRoomSelected(room.id) ? "Cancelar reserva" : "Agregar a Reserva"} */}
          Agregar a la reserva
        </Button>
      </div>
    </div>
  );
}
