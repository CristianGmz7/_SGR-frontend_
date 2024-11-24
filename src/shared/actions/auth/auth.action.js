import { sgrApi } from "../../../config/api";

export const loginAsync = async ( form ) => {
  try
  {
    const {data} = await sgrApi.post(`/auth/login`, form);
    return data;
  }
  catch (error)
  {
    console.error({error});
    return error?.response?.data
  }
}