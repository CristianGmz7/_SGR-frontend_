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