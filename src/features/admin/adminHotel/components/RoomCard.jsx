import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RoomCard = ({ room, isEditingOrCreating = false, deleteRoom }) => {

  const navigate = useNavigate();

  const [existsRoomDelete, setExistsRoomDelete] = useState(false);

  //sirve para variar entre confirmar o no confirmar eliminación
  const handleToggleDeleteRoom = () => {
    setExistsRoomDelete(!existsRoomDelete)
  }

  //esta función tiene que tener hook de eliminar y posiblemente un navigate
  const handleConfirmDeleteRoom = async (id) => {
    try{
      const result = await deleteRoom(id);
  
      if(result.status){
        toast.success("Habitación eliminada correctamente")
        navigate('/administrationHotelPage/dashboardHotelPage');
      }else{
      toast.error(result.message);
      }
    }
    catch(error){
      console.error("Error al eliminar la habitación:", error);
    }

    setExistsRoomDelete(!existsRoomDelete);     //volver a mostrar editar y eliminar
  }

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
        ) : existsRoomDelete ? (
          <>
            <Button
              variant="contained"
              color={"warning"}
              className="w-full"
              onClick={handleToggleDeleteRoom}
            >
              Cancelar eliminación
            </Button>
          <Button
            variant="contained"
            color={"error"}
            className="w-full"
            onClick={() => handleConfirmDeleteRoom(room.id)}
          >
            Confirmar eliminación
          </Button>
        </>
        ) : (
          <>
            <Link
              to={`/administrationHotelPage/dashboardHotelPage/editRoom/${room.id}`}
            >
              <Button
                variant="contained"
                color={"warning"}
                className="w-full"
              >
                Editar
              </Button>
            </Link>
            <Button
              variant="contained"
              color={"error"}
              className="w-full"
              onClick={handleToggleDeleteRoom}
            >
              Eliminar
            </Button>
          </>
        )
      }
      </div>
    </div>
  );
};
