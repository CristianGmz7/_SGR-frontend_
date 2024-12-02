import * as Yup from 'yup';

export const newAdditionalServicesInitValues = {
  name: "",
  price: 1,
  hotelId: ""
}

export const newAdditionalServicesValidationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre del servicio adicional es requerido"),
  price: Yup.number()
  .required("El precio es requerido")
  .min(1, "El precio minimo es 1"),
  hotelId: Yup.string()
  .required("El id del hotel es requerido"),
});

export const editAdditionalServicesValidationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre del servicio adicional es requerido"),
  price: Yup.number()
  .required("El precio es requerido")
  .min(1, "El precio minimo es 1"),
});