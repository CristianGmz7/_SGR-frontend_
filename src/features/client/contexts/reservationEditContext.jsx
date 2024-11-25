
import { createContext, useContext, useReducer } from "react";
import { substractDate } from "../../../shared/utils/format-date";

//Inicializar contexto
const ReservationEditContext = createContext();

//estado inicial del reducer, para saber que acción componente se debe ejecutar
const initialState = {
  reservation: {},
  prevReservation: {},
  action: "",
  selectedRooms: [],
};

export const UPDATE_RESERVATION_ACTIONS = {
  SET_RESERVATION: "SET_RESERVATION",
  UPDATE_DATES: "UPDATE_DATES",
  CLEAR_RESERVATION: "CLEAR_RESERVATION",
  ADD_ROOM: "ADD_ROOM",
  REMOVE_ROOM: "REMOVE_ROOM",
  ADD_SERVICE: "ADD_SERVICE",
  REMOVE_SERVICE: "REMOVE_SERVICE",
};

//reducer para el estado de la accion
const reservationEditReducer = (state, action) => {
  const initialState = {
    ...action?.payload?.reservation,
    startDate: substractDate(action?.payload?.reservation?.startDate),
    finishDate: substractDate(action?.payload?.reservation?.finishDate),
  };
  const actions = {
    [UPDATE_RESERVATION_ACTIONS.SET_RESERVATION]: {
      ...state,
      prevReservation: initialState,
      reservation: initialState,
      action: action.payload.action,
    },
    [UPDATE_RESERVATION_ACTIONS.UPDATE_DATES]: {
      ...state,
      reservation: {
        ...state?.reservation,
        startDate: action?.payload?.startDate,
        finishDate: action?.payload?.finishDate,
      },
    },
    [UPDATE_RESERVATION_ACTIONS.ADD_ROOM]: {
      ...state,
      reservation: {
        ...state?.reservation,
        roomsInfoList: [
          ...(state?.reservation?.roomsInfoList || []),
          action?.payload,
        ],
      },
    },
    [UPDATE_RESERVATION_ACTIONS.REMOVE_ROOM]: {
      ...state,
      reservation: {
        ...state?.reservation,
        roomsInfoList:
          state?.reservation?.roomsInfoList?.filter(
            (room) => room.id !== action?.payload
          ),
      },
    },
    [UPDATE_RESERVATION_ACTIONS.ADD_SERVICE]: {
      ...state,
      reservation: {
        ...state?.reservation,
        additionalServicesInfoList: [
          ...(state?.reservation?.additionalServicesInfoList || []),
          action?.payload,
        ],
      },
    },
    [UPDATE_RESERVATION_ACTIONS.REMOVE_SERVICE]: {
      ...state,
      reservation: {
        ...state?.reservation,
        additionalServicesInfoList:
          state?.reservation?.additionalServicesInfoList?.filter(
            (service) =>
              service.id !==
              action?.payload.id
          ),
      },
    },
    [UPDATE_RESERVATION_ACTIONS.CLEAR_RESERVATION]: {
      ...state,
      reservation: state?.prevReservation,
    },
  };

  return actions[action.type] || state;
  // si el action.type que se manda no se encuentra en las keys retornar el por defecto
};

export const ReservationEditProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationEditReducer, initialState);

  return (
    <ReservationEditContext.Provider
      value={{
        state: state?.reservation,
        dispatch,
        dafaultState: state?.prevReservation,
        selectedRooms: state?.selectedRooms,
      }}
    >
      {children}
    </ReservationEditContext.Provider>
  );
};

export const useEditReservation = () => {
  const { state, dispatch, dafaultState } = useContext(ReservationEditContext);
  if (!state) {
    throw new Error(
      "useEditReservation must be used within a ReservationEditProvider"
    );
  }

  return {
    state,
    dispatch,
    defaultState: dafaultState,
    selectedRooms: state?.selectedRooms,
  };
};
