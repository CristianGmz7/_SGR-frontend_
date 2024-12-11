import { useState } from "react"
import { CreateRoomForm, RoomCard, RoomPreview } from "../components"
import { useParams } from "react-router-dom";

export const CreateRoomPage = () => {

  const { hotelId } = useParams();

  const [roomDto, setRoomDto] = useState({
    numberRoom: "",
    typeRoom: "",       //hacer un select para esto
    priceNight: 1,
    imageUrl: "",
    hotelId: hotelId,
  });

  console.log(roomDto);
  

  return (
    <div className="flex h-full">
      <CreateRoomForm roomDto={roomDto} setRoomDto={setRoomDto} />
      {/* <RoomPreview roomDto={roomDto}/> */}
      {/* se quitó el preview y en lugar de eso se colocó el RoomCard para mostrar la info necesaria mandando props */}
      {/* <RoomCard room={roomDto} isEditingOrCreating={true}/> */}
      {roomDto && <RoomPreview room={roomDto} isEditingOrCreating={true} />}
    </div>
  )
}
