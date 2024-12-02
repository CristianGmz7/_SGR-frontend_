import { useState } from "react";
import { CreateHotelForm, HotelPreview } from "../components"
// import { usePagination } from "../../../client/hooks";
// import { useUsers } from "../hooks"


export const CreateHotelPage = () => {

  // const { usersData, isLoading, error, loadUsersData } = useUsers();
  // const { searchTerm, setFetching, handleSearchTermChange, handleSubmit } = usePagination(loadUsersData)

  const [hotelDto, setHotelDto] = useState({
    name: "",
    address: "",
    starsMichelin: 1,
    numberPhone: "",
    overview: "",
    description: "",
    imageUrl: "",
    adminUserId: "",
  });

  return (
    <div className="flex h-full">
      <CreateHotelForm 
        // usersData={usersData} isLoading={isLoading} error={error} searchTerm={searchTerm} 
        // setFetching={setFetching} handleSearchTermChange={handleSearchTermChange} handleSubmit={handleSubmit}
        setHotelDto={setHotelDto} hotelDto={hotelDto}
      />
      <HotelPreview hotelDto={hotelDto}/>
    </div>
  )
}