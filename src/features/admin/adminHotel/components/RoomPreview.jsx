import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RoomPreview = ({ room, isEditingOrCreating = true, deleteRoom }) => {

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
  <div className="grid gap-2 p-4 rounded-lg shadow-lg relative group">
    <img
      src={room.imageUrl}
      alt={isEditingOrCreating
        ? "No hay previsualizacion de la img " + `Habitación ${room.numberRoom}`
        : `Habitación ${room.id}`
      }
      width="200"
      height="200"
      className="rounded-lg object-cover w-48 h-48 mx-auto"
    />
    <div className="grid text-center gap-1">
      <div className="font-semibold">Habitación {room.numberRoom}</div>
      <div className="text-xs text-muted-foreground">{room.typeRoom}</div>
      <div className="font-semibold text-gray-700 text-sm">
        ${room.priceNight} / noche
      </div>
    </div>
    {isEditingOrCreating ? (
      <></>
    ) : existsRoomDelete ? (
      <div className="mt-2">
        <Button
          variant="contained"
          color={"warning"}
          className="w-full mb-2"
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
      </div>
    ) : (
      <div className="mt-2">
        <Link
          to={`/administrationHotelPage/dashboardHotelPage/editRoom/${room.id}`}
        >
          <Button
            variant="contained"
            color={"warning"}
            className="w-full mb-2"
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
      </div>
    )}
  </div>
  );
};
