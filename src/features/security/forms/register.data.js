import * as Yup from 'yup'

export const registerInitValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePictureUrl: ''
}

export const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("El nombre es requerido"),
  lastName: Yup.string()
    .required("Los apellidos son requeridos"),
  email: Yup.string()
    .required('El correo electrónico es requerido')
    .email('Ingrese un correo electrónico valido'),
  password: Yup.string()
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .required('La confirmación de la contraseña es requerida')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
  profilePictureUrl: Yup.string()
    .required('La url de la foto de perfil es requerida')
    .url('Ingrese una url valida'),
})