import { useState } from "react"
import { CreateHotelForm } from "../components"
import { HotelPreview } from "../../admin/adminPage/components"

export const CreateHotelPage = () => {

  const [hotelDto, setHotelDto] = useState({
    name: "",
    address: "",
    starsMichelin: 1,
    numberPhone: "",
    overview: "",
    description: "",
    imageUrl: "",
    department: "",
    city: "",
    adminUserId: "usuarioDesdeFrontend"
  });

  return (
    <div className="flex h-full">
      <CreateHotelForm 
        setHotelDto={setHotelDto} hotelDto={hotelDto}
      />
      <HotelPreview hotelDto={hotelDto}/>
    </div>
  )
}
