import * as Yup from 'yup';

export const newRoomValidationSchema = Yup.object({
  numberRoom: Yup.number()
    .required("El numero de habitación es requerido")
    .min(1, "El numero de habitación minimo es 1"),
  typeRoom: Yup.string()          //implementar en un select
    .required("El tipo de habitación es requerido"),
  priceNight: Yup.number()
    .required("El precio por noche es requerido")
    .min(1, "El precio por noche minimo es 1"),
  imageUrl: Yup.string()
    .required("La imagen de la habitación es requerida"),
  hotelId: Yup.string()
    .required("El id del hotel es requerido"),
})