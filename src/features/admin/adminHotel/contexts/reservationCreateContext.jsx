import { createContext, useState, useContext, useEffect } from "react";

const reservationCreateContext = createContext();

export const CreateReservationProvider = ({ children }) => {
  
  //estado inicial de las habitaciones, y fechas seleccionadas
  const [selectedRooms, setSelectedRooms] = useState({
    days: 0,    //dìas de la reserva
    rooms: [],  //habitaciones que seleccionó
    startDate: null,  //fecha inicio y fecha fin
    endDate: null,
  });

  // Método para manejar las habitaciones que se agregan o quitan de la reserva
  const toggleRoomSelection = (room) => {
    
    const isRoomAlreadySelected = selectedRooms?.rooms?.some(
      (selectedRoom) => selectedRoom.id === room.id
    );

    //si ya existe la habitación presionada ya existe entonces se quita
    if (isRoomAlreadySelected) {
      setSelectedRooms({
        ...selectedRooms,
        rooms: selectedRooms?.rooms?.filter(
          (selectedRoom) => selectedRoom.id !== room.id
        ),
      });
    } 
    else {
      setSelectedRooms({
        //al arreglo rooms agrégale una room
        ...selectedRooms,
        rooms: [...(selectedRooms?.rooms ?? []), room],
      });
    }
  };
  //fin del método toggleRoomSelection

  //en esta función se le pasa el id de una habitación y determina si ya existe
  const isRoomSelected = (roomId) =>
    selectedRooms?.rooms?.some((room) => room.id === roomId);

  //recibe la fecha inicio y fecha fin de la reserva y hace la resta 
  // const setDayInterval = (startDate, endDate) => {
  //   const startDay = startDate.get("date");
  //   const endDay = endDate.get("date");
  //   let numberDays = endDay - startDay;

  //   //si la fecha fin es igual a la fecha inicio, colocar cantidad de 1 dia
  //   if (startDay === endDay) numberDays = 1;
  //   //se mantiene todo excepto lo días, se sobreescriben

  //   setSelectedRooms({
  //     ...selectedRooms,
  //     days: numberDays,
  //     startDate: startDate.toISOString(),
  //     endDate: endDate.toISOString(),
  //   });
  // };

  //Nueva implementación se paso el lógica de useSelectedServices al context
  const setDayInterval = (startDate, endDate) => {
    const startDay = new Date(startDate);
    let finishDay = new Date(endDate);

    // Normaliza ambas fechas a la medianoche, solo se necesita calcular los días
    startDay.setHours(0, 0, 0, 0);
    finishDay.setHours(0, 0, 0, 0);

    if (startDay.getTime() === finishDay.getTime()) {
      // Agrega un día a finishDate
      finishDay.setDate(finishDay.getDate() + 1);
    }

    const differenceInTime = finishDay - startDay;

    // Convertir la diferencia de milisegundos a días
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    setSelectedRooms({
      ...selectedRooms,
      days: differenceInDays,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };
  
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
    setTotalServices(
      selectedServices.reduce((acc, { price }) => acc + price, 0)
    );
  }, [selectedServices]);

  const toggleService = (service) => {
    const exist = selectedServices.some(({ id }) => id === service.id);
    //si no existe que agregue a los datos anteriores el nuevo
    if (!exist) {
      setSelectedServices([...selectedServices, service]);
    } else {
      //si existe el servicio lo elimina, solo traerá los services con distinto id al del id del que se quito
      setSelectedServices(
        selectedServices.filter(({ id }) => id !== service.id)
      );
    }
  };

  //Agregado para saber el usuario al que pertenece la reserva
  const [clientToReservation, setClientToReservation] = useState(null);

  //Agregado para editar, aunque no se crear se necesita mandar el Id del hotel
  const [hotelId, setHotelId] = useState();

  //Con este return se devuelve data del context hacia abajo
  return (
    <reservationCreateContext.Provider
    // en el value mando un objeto que es la data que se necesita en varios componentes
      value={{
        selectedRooms: selectedRooms?.rooms,
        toggleRoomSelection,
        isRoomSelected,
        setDayInterval,
        daysInterval: selectedRooms?.days,
        dateInterval: {
          startDate: selectedRooms?.startDate,
          endDate: selectedRooms?.endDate,
        },

        //nuevos agregados
        selectedServices,
        totalServices,
        toggleService,
        clientToReservation,
        setClientToReservation,
        hotelId,
        setHotelId
      }}
    >
      {children}
    </reservationCreateContext.Provider>
  );
};

export const useCreateReservation = () => {
  const context = useContext(reservationCreateContext);
  if (!context) {
    throw new Error("useCreateReservation must be used within a CreateReservationProvider");
  }
  return context;
};