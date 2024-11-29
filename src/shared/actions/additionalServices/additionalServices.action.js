import { sgrApi } from "../../../config/api";

export const getAdditionalServicesByHotelApi = async (hotelId) => {
  try{
    const { data } = await sgrApi.get(
      `/additionalServices/GetByHotel/${hotelId}`
    );

    // console.log(data);

    //mapear la data
    return data;
  }
  catch(error){
        console.error(error);
    return error?.response?.data;
  }
}

export const createAdditionalServiceApi = async (body) => {
  try{
    const { data } = await sgrApi.post(
      `/additionalServices`, body
    );

    return data;
  }
  catch(error){
        console.error(error);
    return error?.response?.data;
  }
}

export const editAdditionalServiceApi = async (id, body) => {
  try{
    const { data } = await sgrApi.put(
      `/additionalServices/${id}`, body
    );

    return data;
  }
  catch(error){
        console.error(error);
    return error?.response?.data;
  }
}

export const deleteAdditionalServiceApi = async (id) => {
  try{
    const { data } = await sgrApi.delete(
      `/additionalServices/${id}`
    );

    return data;
  }
  catch(error){
        console.error(error);
    return error?.response?.data;
  }
}