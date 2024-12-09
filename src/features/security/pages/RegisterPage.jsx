import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store"
import { registerInitValues, registerValidationSchema } from "../forms/"
import { useFormik } from "formik"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useClientStore } from "../../client/store"

export const RegisterPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const register = useAuthStore((state) => state.register);
  const error = useAuthStore((state) => state.error);
  const message = useAuthStore((state) => state.message);
  const resetError = useAuthStore((state) => state.resetError);
  const validateAuthentication = useAuthStore((state) => state.validateAuthentication);

  const setRecentlyRegistered = useClientStore((state) => state.setRecentlyRegistered);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(message);
      navigate("/home");
    }
  }, [ isAuthenticated ]);

  useEffect(() => {
    if(error){
      toast.error(message);
      resetError();
    }
  }, [error, message, resetError])

  const formik = useFormik({
    initialValues: registerInitValues,
    validationSchema: registerValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      setLoading(true);
      register(formValues);
      validateAuthentication();
      setRecentlyRegistered();  //esto con el objetivo que se disparé el modal de crear hotel en HomePage
      setLoading(false);
    }
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-800">Bienvenido</h1>
          <p className="mt-2 text-sm text-gray-600">Crea una nueva cuenta para comenzar a reservar.</p>
        </div>
        {/* form */}
        <div className="space-y-6">
          <form onSubmit={formik.handleSubmit}>
            {/* NOMBRE */}
            <div>
              <label
                htmlFor="firstName" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre
              </label>
              <input 
                id="firstName"
                name="firstName"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ingresa tu nombre"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {
                formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-500 text-xs mb-2">
                    {formik.errors.firstName}
                  </div>
                )
              }
            </div>
            {/* APELLIDO */}
            <div>
              <label
                htmlFor="lastName" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apellidos
              </label>
              <input 
                id="lastName"
                name="lastName"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ingresa tus apellidos"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {
                formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500 text-xs mb-2">
                    {formik.errors.lastName}
                  </div>
                )
              }
            </div>
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico
              </label>
              <input 
                id="email"
                name="email"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ingresa tu correo electrónico"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {
                formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-xs mb-2">
                    {formik.errors.email}
                  </div>
                )
              }
            </div>
            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input 
                id="password"
                name="password"
                type="password"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ingresa tu contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {
                formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-xs mb-2">
                    {formik.errors.password}
                  </div>
                )
              }
            </div>
            {/* CONFIRM PASSWORD */}
            <div>
              <label
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar contraseña
              </label>
              <input 
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Confirma tu contraseña"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {
                formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="text-red-500 text-xs mb-2">
                    {formik.errors.confirmPassword}
                  </div>
                )
              }
            </div>
            {/* PROFILEPICTUREURL */}
            <div>
              <label
                htmlFor="profilePictureUrl" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ingresa tu foto de perfil
              </label>
              <input 
                id="profilePictureUrl"
                name="profilePictureUrl"
                // type="url"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ingresa URL de tu foto de perfil"
                value={formik.values.profilePictureUrl}
                onChange={formik.handleChange}
              />
              {
                formik.touched.profilePictureUrl && formik.errors.profilePictureUrl && (
                  <div className="text-red-500 text-xs mb-2">
                    {formik.errors.profilePictureUrl}
                  </div>
                )
              }
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
        {/* form */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/security/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
