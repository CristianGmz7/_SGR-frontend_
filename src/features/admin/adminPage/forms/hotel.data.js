import * as Yup from 'yup';

export const newHotelInitValues = {
  name: "",
  address: "",
  starsMichelin: 1,
  numberPhone: 0,
  overview: "",
  description: "",
  imageUrl: "",
  adminUserId: ""
}

export const newHotelValidationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre del hotel es requerido"),
  address: Yup.string()
    .required("La dirección del hotel es requerida"),
  starsMichelin: Yup.number()
    .required("El numero de estrellas del hotel es requerido")
    .min(1, "El numero minimo de estrellas es 1")
    .max(5, "El numero maximo de estrellas es 5"),
  numberPhone: Yup.number()
    .required("El numero de telefono del hotel es requerido")
    .min(0, "El número debe ser al menos 0") 
    .max(99999999, "El número debe ser como máximo 8 digitos")
    .test(
      "len",
      "El número de teléfono debe tener exactamente 8 dígitos",
      (val) => val?.toString().length === 8
    ), 
  overview: Yup.string()
    .required("La descripcion general es requerida"),
  description: Yup.string()
    .required("La descripcion del hotel es requerida"),
  imageUrl: Yup.string()
    .required("La url de la imagen es requerida"),
  adminUserId: Yup.string()
    .required("El id del usuario administrador es requerida")
})