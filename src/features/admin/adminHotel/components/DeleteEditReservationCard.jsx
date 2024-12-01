import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//traer el hook de useReservations para eliminar
export const DeleteEditReservationCard = ({ reservation, isReservationDisabled, hotelId }) => {
  const [isEditButtonOpen, setIsEditButtonOpen] = useState(false);
  const [isDeleteButtonOpen, setIsDeleteButtonOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenDeleteReservation = () => {
    setIsDeleteButtonOpen(!isDeleteButtonOpen);
    setIsEditButtonOpen(false);
  };

  //aqui se debe redirigir a la pagina de editar
  const handleEditReservation = () => {
    setIsEditButtonOpen(!isEditButtonOpen);
    setIsDeleteButtonOpen(false);
    navigate(`/administrationHotelPage/dashboardHotelPage/editReservation/${reservation.id}`);
  };

  const handleDeleteReservation = async (id) => {

    console.log("Aqui se debe hacer petición para eliminar")
    // try{
    //   const result = await deleteReservation(id);

    //   if(result.status){
    //     toast.success("Reserva eliminada correctamente")
    //     navigate("/");
    //   }else{
    //     toast.error("Error al eliminar la reserva")
    //   }
    // }
    // catch(error){
    //   console.error("Error al eliminar la reserva:", error);
    //   toast.error("Ocurrió un error al eliminar la reserva");
    // }
  }

  return (
    <>
      <Button
        onClick={handleOpenDeleteReservation}
        className="absolute right-100"
        variant="contained"
        sx={{
          backgroundColor: "#f44336", // Color rojo
          color: "#fff",
          "&:hover": {
            backgroundColor: "#d32f2f",
          },
        }}
        disabled={isReservationDisabled(reservation.startDate)}
      >
        Eliminar Reserva
      </Button>
      <Button
        onClick={handleEditReservation}
        className="absolute right-100"
        variant="contained"
        sx={{
          backgroundColor: "#ff9800", // Color naranja
          color: "#fff",
          "&:hover": {
            backgroundColor: "#fb8c00",
          },
        }}
    
        disabled={isReservationDisabled(reservation.startDate)}
      >
        Editar Reserva
      </Button>

      {isDeleteButtonOpen && (
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-red-500 font-semibold">
            ¿Estás seguro de que deseas eliminar esta reserva?
          </p>
          <Button
            className="w-full"
            variant="contained"
            onClick={() => handleDeleteReservation(reservation.id)}
            sx={{
              backgroundColor: "#f44336", // Color rojo para confirmación
              color: "#fff",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            Confirmar Eliminación
          </Button>
          <Button
            onClick={handleOpenDeleteReservation}
            className="w-full"
            variant="contained"
            sx={{
              backgroundColor: "#9e9e9e", // Color gris para cancelar
              color: "#fff",
              "&:hover": {
                backgroundColor: "#757575",
              },
            }}
          >
            Cancelar
          </Button>
        </div>
      )}
    </>
  );
}
