import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const PayPalCheckout = ({ total, functionAfterPaying }) => {

  const [error, setError] = useState("");

  //se creo un key para que cada que se agregue un servicio adicional en crear reservación pues el valor de total se actualice
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [total]);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AQ8oR4e02mPYsn1zpMxoByYtRPMRsKBrlZGEXUrA0-7F24Sa4y_AnfvOv0A6Pjnrn6lHRz5GY8Xx9y6y",
        currency: "USD",
      }}
    >
      <div className="flex flex-col items-center justify-center mt-5">
        <div style={{ width: "100%", maxWidth: "600px" }}>
          {
            <PayPalButtons
              key={key}
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total.toString(), // Monto a cobrar
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                try{
                  const order = await actions.order.capture();
                  const orderId = data.orderID;
                  const captureId = order.purchase_units[0].payments.captures[0].id;

                  console.log("Order ID:", orderId);
                  console.log("Capture ID:", captureId);

                  functionAfterPaying(orderId, captureId)
                } catch (error){
                  console.error("Error al capturar la orden", error);
                  toast.error("Error al procesar el pago");
                }
              }}
            />
          }
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </PayPalScriptProvider>
  );
};
