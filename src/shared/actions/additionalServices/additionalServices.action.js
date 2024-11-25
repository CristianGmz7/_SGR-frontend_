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