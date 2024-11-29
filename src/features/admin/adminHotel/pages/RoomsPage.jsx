import { Link, useParams } from "react-router-dom";
import { useRooms } from "../hooks/useRooms";
import { useEffect } from "react";
import { RoomCard } from "../components";
import { Button, CircularProgress } from "@mui/material";

export const RoomsPage = () => {
  const { hotelId } = useParams();
  const { roomsData, isLoading, error, loadRoomsHotelData } = useRooms();

  useEffect(() => {
    //setear valores iniciales para que obtenga todos hoteles de page 1
    loadRoomsHotelData(hotelId, "", 1);
  }, [hotelId]);

  console.log(roomsData);

  return (
    <>
      <Link
        to={`/administrationHotelPage/dashboardHotelPage/createRoom/${hotelId}`}
      >
        <Button
          variant="contained"
          // className="mb"
          //falta onclick
        >
          Crear Habitación
        </Button>
      </Link>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {roomsData?.data?.items?.rooms?.map((room) => (
            <RoomCard key={room.id} room={room} isEditingOrCreating={false}/>
          ))}
        </div>
      )}
    </>
  );
};
