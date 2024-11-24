import { sgrApi } from "../../../config/api"

export const getAllHotelsApi = async (page = 1) => {
  try{
    const { data } = await sgrApi.get(
      `/hotels?page=${page}`
    );  
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}