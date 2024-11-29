import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { editAdditionalServicesValidationSchema } from "../forms";
import { useAdditionalServices } from "../hooks";

export const EditAdditionalServiceForm = ({isEditingService}) => {

  //aqui se podrian declarar los valores iniciales
  const additionalServicesInitValues = {
    name: isEditingService.name,
    price: isEditingService.price
  }

  const { isLoading, error, editAdditionalService } = useAdditionalServices();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log("Enviando datos del formulario:", values);
  
    try {
      //falta incluir id
      const result = await editAdditionalService(isEditingService.id, values);
      if (result.status) {
        toast.success("Servicio Adicional editado exitosamente!");
        resetForm(); // Reiniciar el formulario
        navigate('/administrationHotelPage/dashboardHotelPage'); // Redirigir
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error editando el servicio adicional:", error);
      toast.error("Ocurrió un error al editar el servicio adicional");
    } finally {
      setSubmitting(false); // Finalizar el estado de "enviando"
    }
  };

  return (
    <div className="w-1/2 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">
        Editar Servicio Adicional
      </h2>
      <Formik
        initialValues={isEditingService}
        validationSchema={editAdditionalServicesValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            {/* Nombre de servicio adicional */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Ingrese el nombre"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Precio*/}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Precio
              </label>
              <Field
                id="price"
                name="price"
                type="number"
                placeholder="Ingrese el precio"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Editar Servicio Adicional
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
