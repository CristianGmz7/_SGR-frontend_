// import { ReservationCard } from "../components/ReservationCard";

import { CircularProgress, Pagination } from "@mui/material";
import { usePagination, useReservations } from "../hooks";
import { ReservationCard } from "../components";

export const YourReservations = () => {
  //custom hooks
  const { reservationsByClientData, error, isLoading, loadReservationsByClient} = useReservations();
  const { currentPage, setFetching, handlePageChange } = usePagination(loadReservationsByClient);

  // Cálculo de las habitaciones para mostrar en la página actual  

  return (
    <div className="container mx-auto p-4 md:p-6 bg-blue-50 text-blue-900 rounded-lg shadow-lg">
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
          <CircularProgress />
        </div>
      ) : (
        // paginatedReservations?.reservations?.map((reservation) => {
          reservationsByClientData?.data?.items?.map((reservation) => {
          return (
            <ReservationCard
              key={reservation?.id}
              reservation={reservation}
            />
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
