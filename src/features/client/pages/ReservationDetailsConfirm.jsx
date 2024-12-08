import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReservation } from "../contexts";
import { AdditionalServicesList } from "../components";
import { useAdditionalServices, usePaypal, useReservations, useSinglePagination } from "../hooks";
import { PayPalCheckout } from "../paypal";

export const ReservationDetailsConfirm = () => {
  const { selectedRooms, daysInterval, dateInterval, 
    selectedServices, toggleService, totalServices, totalRooms, 
    totalReservation
  } = useReservation();
  const { hotelId } = useParams();

  const { additionalServicesByHotelData, isLoading, 
    error:errorAdditionalServices, loadAdditionalServicesByHotel } = useAdditionalServices();
  const { setFetching } = useSinglePagination(loadAdditionalServicesByHotel, hotelId);
  
  const { isLoading:loadingRefund, error:errorRefund, createRefund } = usePaypal();

  //el hook de useSelectedServices se pasó al Provider del context
  const { isLoading:isLoadingReservation, error, createReservation } = useReservations();

  const navigate = useNavigate();

  //función para crear la reservación
  //aqui se mandan los datos que se necesitan en API para poder procesar la reservación
  const handleCreateReservation = async (orderId, captureId) => {
    const reservationData = {
      startDate: dateInterval.startDate,
      finishDate: dateInterval.endDate,
      roomsList: selectedRooms.map(({ id }) => id),
      additionalServicesList: selectedServices.map(({ id }) => id),
      clientId: "usuarioDesdeFrontend",
      orderId: orderId,
      captureId: captureId
      //por el momento este dato se esta obteniendo en el backend
    };

    try{
      const result = await createReservation(reservationData);

      if(result.status){
        toast.success("Reservación creada con éxito");
        navigate("/");
        //si no funciona la creación probar a hacer el reembolso
      }else{
        toast.error("Error al crear la reserva... Generando reembolso");

        //inicio de lo del reembolso
        try{
          const result = await createRefund({captureId: captureId, reason: ""})
          if(result.status){
            toast.success("Reembolso creado con éxito");
          }
          else{
            toast.error("Error al crear el reembolso, pongase en contacto con el administrador del hotel");
          }
        }
        catch(error){
          console.error("Error al crear el reembolso:", error);
          toast.error("Ocurrió un error al crear el reembolso, , pongase en contacto con el administrador del hotel");
        }
        //fin de lo del reembolso
      }
    }
    catch(error){
      console.error("Error al crear la reserva:", error);
      toast.error("Ocurrió un error al crear la reserva");
    }

  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-blue-50 text-foreground rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <Link
          //a medida se coloquen numeros se regresa la cantidad de "nodos" que se especifique
          to={-1}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Regresar
        </Link>
        <h1 className="text-2xl font-bold text-blue-700 text-center">
          Su reservación
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {selectedRooms?.map(
          ({ id, typeRoom, priceNight, imageUrl, numberRoom }) => (
            <div
              key={id}
              className="bg-blue-100 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img
                src={imageUrl}
                alt={`Habitación ${numberRoom}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-700">
                  Habitación {numberRoom}
                </h3>
                <p className="text-blue-500">{typeRoom}</p>
                <p className="font-semibold text-blue-600">$ {priceNight}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-blue-600">
          Servicios adicionales
        </h2>
        <AdditionalServicesList
          // data={data?.data}
          data={additionalServicesByHotelData?.data}
          toggleService={toggleService}
          selectedServices={selectedServices}
          loading={isLoading}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-100 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            Total de habitaciones
          </h2>
          <p className="text-2xl font-bold text-blue-800">${totalRooms}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            Total de servicios
          </h2>
          <p className="text-2xl font-bold text-blue-800">${totalServices}</p>
        </div>
      </div>
      <div className="mt-6 bg-blue-200 rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-center text-blue-700">
          Total a pagar
        </h2>
        <p className="text-3xl font-bold text-blue-900">
          {/* $ {(totalRooms + totalServices) * (daysInterval || 1)} */}
          {/* $ {parseFloat(totalReservation).toFixed(2)} */}
          $ {totalReservation}
        </p>
      </div>
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-500">
          Fecha de entrada: {dayjs(dateInterval.startDate).format("DD/MM/YYYY")}
        </p>
        <p className="text-sm text-blue-500">
          Fecha de salida: {dayjs(dateInterval.endDate).format("DD/MM/YYYY")}
        </p>
        <p className="text-sm text-blue-500">
          Total dias: {daysInterval}
        </p>
      </div>
      <div className="mt-6 text-right">
        <PayPalCheckout total={totalReservation} functionAfterPaying={handleCreateReservation} />
      </div>
    </div>
  );
};

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
