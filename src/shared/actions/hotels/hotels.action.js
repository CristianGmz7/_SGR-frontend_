import { sgrApi } from "../../../config/api"

//este va a quedar para admin
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

export const getAllHotelsForUsersApi = async (searchTerm = "", page = 1, starsNumber = 0, department = "", city = "", minLikes = -1, maxLikes = -1) => {
  try{
    const { data } = await sgrApi.get(
      `/hotels?searchTerm=${searchTerm}&page=${page}&starsNumber=${starsNumber}&department=${department}&city=${city}&minLikes=${minLikes}&maxLikes=${maxLikes}`
    );  
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const getHotelByIdApi = async (id) => {
  try{
    const { data } = await sgrApi.get(
      `/hotels/${id}`
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

export const editHotelApi = async (id, body) => {
  try{
    const {data} = await sgrApi.put(
      `/hotels/${id}`, body
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