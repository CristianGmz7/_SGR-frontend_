import { sgrApi } from "../../../config/api";

export const getAllUsersWithUserRoleApi = async (searchTerm = "") => {
  try{
    const { data } = await sgrApi.get(
      `/users/allUsersWithUserRole?searchTerm=${searchTerm}`
    );

    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

//obtener todos los usuarios se hace donde se usa el React Select porque si no provoca funcionamiento bien raro cuando se quiere seleccionar

export const getUserLoggedApi = async () => {
  try{
    const { data } = await sgrApi.get(
      `/users/userLogged`
    );

    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const editUserInfoApi = async (body) => {
  try{
    const { data } = await sgrApi.put(
      `/users/editUserInfo`, body
    );

    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}

export const confirmPasswordUserToEditApi = async (password) => {
  try{
    const { data } = await sgrApi.get(
      `/users/confirmPasswordUserToEdit?password=${password}`
    );

    console.log(data)
    return data;
  }
  catch(error){
    console.error(error);
    // console.log(error?.response?.data);
    return error?.response?.data;
  }
}