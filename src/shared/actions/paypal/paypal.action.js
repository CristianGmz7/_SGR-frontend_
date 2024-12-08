import { sgrApi } from "../../../config/api";

export const createRefundApi = async (refundData) => {
  try{
    const {data} = await sgrApi.post(
      `/paypal/refund`, refundData
    );
    return data;
  }
  catch(error){
    console.error(error);
    return error?.response?.data;
  }
}