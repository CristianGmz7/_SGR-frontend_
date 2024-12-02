import { useState } from "react";
import { useHotels, usePagination } from "../../../client/hooks"
import { HotelDetail, HotelList } from "../components"
import { useHotels as useHotelsAdmin } from "../hooks";


export const DashboardAdminPage = () => {

  const { hotelsData, isLoading, error, loadHotelsData } = useHotels()
  const { currentPage, searchTerm, handlePageChange, setFetching, handleSearchTermChange, handleSubmit } = usePagination(loadHotelsData);

  const { deleteHotel } = useHotelsAdmin();

  // Estado para el hotel seleccionado
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="flex h-full">
      <HotelList hotelsData={hotelsData} isLoading={isLoading} error={error} 
        searchTerm={searchTerm} handlePageChange={handlePageChange} 
        handleSearchTermChange={handleSearchTermChange} handleSubmit={handleSubmit}
        selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel}
      />
      <HotelDetail selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel} setFetching={setFetching} deleteHotel={deleteHotel}/>
    </div>
  )
}
