import { loginInitValues, loginValidationSchema } from "../forms";
import { useAuthStore } from "../store";
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const LoginPage = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const message = useAuthStore((state) => state.message);
  const resetError = useAuthStore((state) => state.resetError);
  const validateAuthentication = useAuthStore((state) => state.validateAuthentication);

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
    initialValues: loginInitValues,
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {

      setLoading(true);
      await login(formValues);
      validateAuthentication();
      setLoading(false);
    }
  });

  //validacion de loading === true mostrar mensaje de espera

  return (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-blue-800">Bienvenido</h1>
        <p className="mt-2 text-sm text-gray-600">Inicia sesión en tu cuenta para comenzar a reservar.</p>
      </div>
      <div className="space-y-6">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              // type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Ingresa tu correo electrónico"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />

            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1 mt-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />

            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
            Iniciar sesión
            </button>
          </div>
        </form>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/security/register" className="font-medium text-blue-600 hover:text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  </div>
  )
}
