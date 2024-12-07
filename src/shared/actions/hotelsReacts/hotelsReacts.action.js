import { sgrApi } from "../../../config/api";

export const getHotelReactByHotelAndUser = async (hotelId, isAuthenticated) => {
  try{
    const { data } = await sgrApi.get(
      `/hotelsReacts?hotelId=${hotelId}&isAuthenticated=${isAuthenticated}`,
    );  
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const createHotelReactApi = async (body) => {
  try{
    const { data } = await sgrApi.post(
      `/hotelsReacts`, body
    );  
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const editHotelReactApi = async (body) => {
  try{
    const { data } = await sgrApi.put(
      `/hotelsReacts`, body
    );  
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const deleteHotelReactApi = async (hotelId, action) => {
  try{
    const { data } = await sgrApi.delete(
      `/hotelsReacts?hotelId=${hotelId}&action=${action}`
    );  
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}