import { sgrApi } from "../../../config/api";

export const getHotelIdNameApi = async () => {
  try{
    const { data } = await sgrApi.get(
      `/dashboardAdminHotel/getHotelIdName`
    );

    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}