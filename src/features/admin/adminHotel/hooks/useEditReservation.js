import { useState } from "react";

export const useEditReservation = () => {
  //este dto es el que se va a estar modificando si se agregan habitaciones, cambian fechas o agregan SA
  const [reservationDto, setReservationDto] = useState(null);

  const setInitialData = (data) => {
    setReservationDto(data);
  };

  const onDatesChange = (newDates) => {
    // dispatch({
    //   type: UPDATE_RESERVATION_ACTIONS.UPDATE_DATES,
    //   payload: newDates,
    // });
    setReservationDto((prev) => {
      // console.info(prev)
      const newValue = {
        ...prev, //prev es el objeto que devuelve el backend, contiene: data, message y status
        data: {
          ...prev.data,
          startDate: newDates?.startDate,
          finishDate: newDates?.finishDate,
        },
      };

      // console.info(newValue)
      return newValue;
    });
  };

  //roomToRemove ya es un id
  const onRemoveRoom = (roomToRemove) => {

    setReservationDto((prev) => {
      const newValue = {
        ...prev,
        data: {
          ...prev.data,
          roomsInfoList:
            prev?.data?.roomsInfoList?.filter(
              (room) => room.id !== roomToRemove
            )
        }
      }
      return newValue;
    });
  }

  //roomToAdd tiene la estructura que se muestra en las cards, img, numero habitacion, tipo habitación...
  const onAddRoom = (roomToAdd) => {
    setReservationDto((prev) => {
      const newValue = {
        ...prev,
        data: {
          ...prev.data,
          roomsInfoList: [
            ...(prev?.data?.roomsInfoList || []), roomToAdd
          ]
        }
      }
      return newValue
    });
  }

  const onAddService = (serviceToAdd) => {
    setReservationDto((prev) => {
      const newValue = {
        ...prev,
        data: {
          ...prev.data,
          additionalServicesInfoList: [
            ...(prev?.data?.additionalServicesInfoList || []), serviceToAdd
          ]
        }
      }
      return newValue
    })
  }

  const onRemoveService = (serviceToRemove) => {
    setReservationDto((prev) => {
      const newValue = {
        ...prev,
        data: {
          ...prev.data,
          additionalServicesInfoList:
            prev?.data?.additionalServicesInfoList?.filter(
              (service) => service.id !== serviceToRemove.id
            )
        }
      }
      return newValue
    })
  }

  const onResetEditReservation = (originalData) => {
    console.log("desde onreset")
    setReservationDto((prev) => {
      const newValue = {
        ...prev,
        data: originalData?.data
      }
      return newValue
    })
  }

  return {
    reservationDto,
    setInitialData,
    onDatesChange,
    onRemoveRoom,
    onAddRoom,
    onAddService,
    onRemoveService,
    onResetEditReservation
  };
};
