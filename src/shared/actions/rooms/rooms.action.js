import { sgrApi } from "../../../config/api"

export const getAllRoomsByHotelApi = async (hotelId, page, filterStartDate, filterEndDate) => {
  try {
    const { data } = await sgrApi.get(
      `/rooms/GetByHotel/${hotelId}?page=${page}&filterStartDate=${filterStartDate}&filterEndDate=${filterEndDate}`
    );

    // console.log("desde el action asegurandose que se disparé la peticion");
    // console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
}