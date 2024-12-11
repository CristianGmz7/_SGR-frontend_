//INCLUYENDO MANERA QUE SI NO HAY DATA SE MUESTRE MENSAJE YourReservations
// import { ReservationCard } from "../components/ReservationCard";

import { CircularProgress, Pagination } from "@mui/material";
import {
  usePagination,
  usePaginationYourReservations,
  useReservations,
} from "../hooks";
import { ReservationCard } from "../components";
import { Skeleton, Alert } from '@mui/material';

export const YourReservations = () => {
  //custom hooks
  const {
    reservationsByClientData,
    error,
    isLoading,
    loadReservationsByClient,
  } = useReservations();
  // const { currentPage, setFetching, handlePageChange } = usePagination(loadReservationsByClient);
  const { currentPage, setFetching, handlePageChange } =
    usePaginationYourReservations(loadReservationsByClient);

  // Cálculo de las habitaciones para mostrar en la página actual

  return (
    <div className="container mx-auto p-4 md:p-6 bg-blue-50 text-blue-900 rounded-lg shadow-lg">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : reservationsByClientData?.data?.items?.length <= 0
      ? (
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center min-h-[300px] w-full">
          <div className="text-center text-4xl text-gray-300 font-bold opacity-50">
            No hay reservas realizadas
          </div>
        </div>
      </div>
      )
      : (
        reservationsByClientData?.data?.items?.map((reservation) => {
          return (
            <ReservationCard key={reservation?.id} reservation={reservation} />
          );
        })
      )}

      {/* <Pagination /> */}
      <div className="flex flex-row justify-center items-center">
        <Pagination
          count={reservationsByClientData?.data?.totalPages}
          page={reservationsByClientData?.data?.currentPage}
          // onChange={(_event, page) => handlePageChange(page)}
          onChange={handlePageChange}
          key={reservationsByClientData?.data?.currentPage}
        />
      </div>
    </div>
  );
};