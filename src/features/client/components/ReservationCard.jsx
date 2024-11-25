import { formatSubstractDate } from "../../../shared/utils/format-date";
import { RoomReservationCard } from "./RoomReservationCard";
import { AdditioServReservationCard } from "./AdditioServReservationCard";
import { ReservationStatusCard } from "./ReservationStatusCard";
import { DeleteEditReservationCard } from "./DeleteEditReservationCard";
import dayjs from "dayjs";


export const ReservationCard = ({ reservation }) => {
  const isReservationDisabled = (reservationStartDate) => {
    const currentDate = new Date().toISOString();
    const startDate = new Date(reservationStartDate).toISOString();

    const sDatedayjs = dayjs(startDate).subtract(6, "hour");
    const cDatedayjs = dayjs(currentDate);

    return sDatedayjs < cDatedayjs;
  };

  const calculateDays = (reservationStartDate, reservationFinishDate) => {
    const startDate = new Date(reservationStartDate);
    let finishDate = new Date(reservationFinishDate);

    // Normaliza ambas fechas a la medianoche, solo se necesita calcular los días
    startDate.setHours(0, 0, 0, 0);
    finishDate.setHours(0, 0, 0, 0);

    if (startDate.getTime() === finishDate.getTime()) {
      // Agrega un día a finishDate
      finishDate.setDate(finishDate.getDate() + 1);
    }

    const differenceInTime = finishDate - startDate;

    // Convertir la diferencia de milisegundos a días
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // 1000 ms/s * 3600 s/h * 24 h/d

    return differenceInDays; // Retornar la cantidad de días
  };

  return (
    <>
      <section className="border rounded-lg p-6 mb-6 shadow-md bg-blue-100">
        <h2 className="text-lg font-bold text-blue-800 mb-4">
          Reserva: {reservation.id}
        </h2>
        <div className="flex justify-between text-blue-600 mb-6">
          <p>Inicio: {formatSubstractDate(reservation.startDate)}</p>
          <p>Fin: {formatSubstractDate(reservation.finishDate)}</p>
        </div>
        <div className="flex justify-between text-blue-600 mb-6">
          <p>
            Total dias:{" "}
            {calculateDays(
              reservation.startDate,
              reservation.finishDate
            )}
          </p>
        </div>
        <h3 className="text-md font-bold text-blue-700 mb-2">Habitaciones</h3>

        {/* Card de Lista de habitaciones de reserva */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reservation.roomsInfoList.map((room) => (
            <RoomReservationCard key={room.id} room={room} />
          ))}
        </div>

        {/* Card de Lista de servicios adicionales de reserva */}
        <h3 className="text-md font-bold mt-4 text-blue-700 mb-2">
          Servicios Adicionales
        </h3>
        {reservation?.additionalServicesInfoList?.length ? (
          reservation.additionalServicesInfoList.map((aS) => (
            <AdditioServReservationCard key={aS.id} aS={aS} />
          ))
        ) : (
          <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 transition-colors mb-2">
            <p className="text-blue-700">
              No hay servicios adicionales para esta reserva
            </p>
          </div>
        )}

        <p className="font-bold mt-4 text-blue-800">
          Total Reserva = ${reservation.price}
        </p>

        {/* Estado de la Reserva Section */}
        <section className="border rounded-lg p-6 mb-6 shadow-md bg-blue-100">
          <h2 className="text-lg font-bold text-blue-800 mb-4">
            Estado de la Reserva
          </h2>
          <ReservationStatusCard reservation={reservation} />
        </section>

        {/* Editar Borrar Reserva Section */}
        <DeleteEditReservationCard
          reservation={reservation}
          isReservationDisabled={isReservationDisabled}
        />
      </section>
    </>
  );
};
