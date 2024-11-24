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