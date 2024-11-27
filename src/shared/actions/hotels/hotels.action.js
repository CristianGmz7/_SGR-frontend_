import { sgrApi } from "../../../config/api"

export const getAllHotelsApi = async (searchTerm = "", page = 1) => {
  try{
    const { data } = await sgrApi.get(
      // `/hotels?page=${page}`
      `/hotels?searchTerm=${searchTerm}&page=${page}`
    );  
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const createHotelApi = async (hotelDto) => {
  try{
    const {data} = await sgrApi.post(
      `/hotels`, hotelDto
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const deleteHotelApi = async (id) => {
  try{
    const {data} = await sgrApi.delete(
      `/hotels/${id}`
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}