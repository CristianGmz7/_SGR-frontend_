import { useState } from "react"
import { CreateRoomForm, RoomCard } from "../components"
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
      <RoomCard room={roomDto} isEditingOrCreating={true}/>
    </div>
  )
}
