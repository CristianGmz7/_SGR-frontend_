import { sgrApi } from "../../../config/api";

export const createReservationApi = async (reservationData) => {
  try{
    const {data} = await sgrApi.post(
      `/reservations`, reservationData
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

//probar dejando el clientId si =
export const getAllReservationsByClientApi = async (page = 1, clientId = "") => {
  try{
    const {data} = await sgrApi.get(
      `/reservations?clientId=${clientId}&page=${page}`
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const deleteReservationApi = async (id) => {
  try{
    const {data} = await sgrApi.delete(
      `/reservations/${id}`
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const editReservationApi = async (id, body) => {
  try{
    const {data} = await sgrApi.put(
      `/reservations/${id}`, body
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}