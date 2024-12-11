import { CircularProgress, Pagination } from "@mui/material";
import { HotelAdminPageCard } from "./HotelAdminPageCard";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export const HotelList = ({hotelsData, isLoading, error, searchTerm, 
  handlePageChange, handleSearchTermChange, handleSubmit,
  setSelectedHotel, selectedHotel}) => {
  return (
    <div className="flex-1 p-4 flex flex-col h-full">
      {/* Botón para crear un nuevo hotel */}
      <Link
        className="mb-4 bg-blue-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
        to={"/administrationPage/createHotel"}
      >
        Crear nuevo hotel
      </Link>

      <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-lg mb-4">
          <div className="w-full">
            <input 
              value={searchTerm}
              onChange={(e) => handleSearchTermChange(e.target.value)}
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="Buscar Hoteles"
            />
          </div>
          <div>
            <button type="submit"
            className="flex items-center bg-unah-yellow justify-center w-12 h-12 text-black rounded-r-lg" >
              <FaSearch className="h-6 w-6" />
            </button>
          </div>
        </form>

      {
        isLoading
        ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
        )
        : hotelsData?.data?.items?.length <= 0 ?
        (
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center min-h-[300px] w-full bg-white">
            <div className="text-center text-4xl text-gray-300 font-bold opacity-50">
              No hay hoteles que mostrar
            </div>
          </div>
        </div>
        )
        : (      
        <div className="flex-grow overflow-y-auto">
          {hotelsData?.data?.items?.map((hotel) => (
            <HotelAdminPageCard key={hotel.id} hotel={hotel}
            selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel}
            />
          ))}
        </div>)
      }

      <div className="flex flex-row justify-center items-center">
        <Pagination
          count={hotelsData?.data?.totalPages}
          page={hotelsData?.data?.currentPage}
          onChange={handlePageChange}
          key={hotelsData?.data?.currentPage}
        />
      </div>
    </div>
  );
}
