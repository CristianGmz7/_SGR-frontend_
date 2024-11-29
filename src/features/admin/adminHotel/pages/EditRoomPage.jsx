import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRooms } from "../hooks";
import { CircularProgress } from "@mui/material";
import { EditRoomForm, RoomCard } from "../components";
//formulario y card que servirá como preview, creo que siempre sera RoomCard

export const EditRoomPage = () => {

  const { roomId } = useParams();
  const { roomData, isLoading, error, loadRoomData, editRoom } = useRooms();

  const [editRoomInitValues, setEditRoomInitValues] = useState(null);
  const [roomDto, setRoomDto] = useState(null);

  useEffect(() => {
    loadRoomData(roomId);
    setEditRoomInitValues(roomData?.data);
    setRoomDto(roomData?.data)
  }, [roomId])

  
  useEffect(() => {
    if (roomData?.data) {
      setEditRoomInitValues({
        numberRoom: roomData.data.numberRoom,
        typeRoom: roomData.data.typeRoom,       //hacer un select para esto
        priceNight: roomData.data.priceNight,
        imageUrl: roomData.data.imageUrl,
      });
      // setHotelDto(hotelData.data);
      setRoomDto(editRoomInitValues);
    }
  }, [roomData]);

  if (isLoading || !editRoomInitValues || !roomDto) {
    return (
      <div className="flex flex-auto justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <EditRoomForm setRoomDto={setRoomDto} roomDto={roomDto} editRoomInitValues={editRoomInitValues} 
        isLoading={isLoading} error={error} editRoom={editRoom} roomId={roomId}
      />
      {roomDto && <RoomCard room={roomDto} isEditingOrCreating={true} />}
    </div>
  )
}
