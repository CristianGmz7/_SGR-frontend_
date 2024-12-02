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

export const getAllRoomsByAdminHotelApi = async (id, searchTerm, page) => {
  try {
    const { data } = await sgrApi.get(
      `/rooms/GetByAdminHotel/${id}?searchTerm=${searchTerm}&page=${page}`
    );

    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
}

export const getRoomByIdApi = async (id) => {
  try {
    const { data } = await sgrApi.get(
      `/rooms/${id}`
    );

    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
}

export const createRoomApi = async (body) => {
  try{
    const {data} = await sgrApi.post(
      `/rooms`, body
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const editRoomApi = async (id, body) => {
  try{
    const {data} = await sgrApi.put(
      `/rooms/${id}`, body
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const deleteRoomApi = async (id) => {
  try{
    const {data} = await sgrApi.delete(
      `/rooms/${id}`
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}