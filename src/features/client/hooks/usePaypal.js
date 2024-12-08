import { useState } from "react";
import { createRefundApi } from "../../../shared/actions/paypal/paypal.action";

export const usePaypal = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRefund = async (refundData) => {
    try {
      setIsLoading(true);
      const result = await createRefundApi(refundData)
      return result;

    } catch (error) {
      console.error("Error al realizar reembolso:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }


  return {
    isLoading,
    error,

    createRefund
  }
}
