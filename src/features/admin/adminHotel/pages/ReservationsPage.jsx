import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import { useReservations } from "../hooks";
import { usePaginationReservationsByHotel } from "../../../client/hooks";
import { ReservationCard } from "../components/ReservationCard";
import Select from "react-select";
import { sgrApi } from "../../../../config/api";
import { FaSearch } from "react-icons/fa";
import { components } from "react-select";
import { useCreateReservation } from "../contexts/reservationCreateContext";

export const ReservationsPage = () => {
  const { hotelId } = useParams();
  const { clientToReservation, setClientToReservation, setHotelId } = useCreateReservation()

  //logica relacionada al input select del user
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async (searchTerm) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await sgrApi.get(
        `/users/allUsers?searchTerm=${searchTerm}`
      );
      setUsersData(data?.data || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data || "Error fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchTermChange = (inputValue, actionMeta) => {
    if (actionMeta.action === "input-change") {
      setSearchTerm(inputValue);
    }
  };

  const handleClientSelected = (clientSelected) => {
    setClientToReservation(clientSelected);
  };

  useEffect(() => {
    setHotelId(hotelId);    //servirá para hacer peticiones en el EditReservation
    if (searchTerm.trim() !== "") {
      fetchUsers(searchTerm);
    } else {
      setUsersData([]);
    }
  }, [searchTerm]);

  const options = usersData.map((user) => ({
    value: user,
    label: (
      <div key={user.id} className="flex items-center">
        <img
          src={user.profilePictureUrl}
          alt={user.id}
          className="w-8 h-8 rounded-full mr-2"
        />
        {user.fullName}
      </div>
    ),
  }));

  const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <FaSearch className="text-gray-500 w-5 h-5" />
    </components.DropdownIndicator>
  );

  //fin de logica relacionada al input select del user
  const {
    reservationsByHotelData,
    isLoading: isLoadingReservations,
    error: errorReservations,
    loadReservationsByClient,
  } = useReservations();
  const {
    currentPage,
    searchTerm: searchTermReservationsByHotel,
    handlePageChange,
  } = usePaginationReservationsByHotel(loadReservationsByClient, hotelId);

  return (
    <div className="container mx-auto p-4 md:p-6 bg-blue-50 text-blue-900 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Crear reservación para un usuario
        </h2>
        <div className="flex justify-center">
          <Select
            id="clientToReservation"
            options={options}
            isLoading={isLoading}
            onInputChange={handleSearchTermChange}
            onChange={(option) => {
              handleClientSelected(option?.value || null); // Pasar el objeto completo o `null`
            }}
            placeholder="Buscar al usuario para crear reserva"
            noOptionsMessage={() =>
              error ? "Error cargando datos" : "No se encontraron resultados"
            }
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: "60px", // Altura mínima para aumentar el tamaño
                fontSize: "11px", // Tamaño de la fuente
              }),
              input: (provided) => ({
                ...provided,
                height: "auto",
              }),
            }}
            components={{ DropdownIndicator: CustomDropdownIndicator }}
          />
        </div>
        {clientToReservation && (
          <Link
            to={`/administrationHotelPage/dashboardHotelPage/hotelRoomList/${hotelId}`}
          >
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Crear Reserva para: {clientToReservation.fullName}
            </button>
          </Link>
        )}
      </div>

      {isLoadingReservations ? (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
          <CircularProgress />
        </div>
      ) : (
        // paginatedReservations?.reservations?.map((reservation) => {
        reservationsByHotelData?.data?.items?.map((reservation) => {
          return (
            <ReservationCard key={reservation?.id} reservation={reservation} hotelId={hotelId}/>
          );
        })
      )}

      <div className="flex mt-5 justify-center">
        <Pagination
          count={reservationsByHotelData?.data?.totalPages}
          page={reservationsByHotelData?.data?.currentPage}
          // onChange={(_event, page) => setPage(page)}
          onChange={handlePageChange}
          key={reservationsByHotelData?.data?.currentPage}
        />
      </div>
    </div>
  );
};
