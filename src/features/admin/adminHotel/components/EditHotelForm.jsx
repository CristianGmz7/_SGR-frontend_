import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { editHotelValidationSchema } from "../forms";
// import { newHotelValidationSchema } from "../../adminPage/forms/hotel.data";

export const EditHotelForm = ({setHotelDto, hotelDto, editHotelInitValues, isLoading, error, editHotel, hotelId}) => {

  // console.log(hotelDto);
  

  const navigate = useNavigate();

  const handleFieldChange = (fieldName, value) => {
    setHotelDto((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };


  const handleSubmit = async (values, { resetForm }) => {

    console.log("Enviando datos del formulario:", hotelDto);

      try {
      // console.log("Enviando datos del formulario:", values);
      console.log("Enviando datos del formulario:", hotelDto);

      const result = await editHotel(hotelId, hotelDto)

      if(result.status){
        toast.success("Hotel editado exitosamente!");
        resetForm();
        navigate('/administrationHotelPage/dashboardHotelPage');
      }else{
        toast.error(result.message);
      }

    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error("Ocurrió un error al editar el hotel");
    }

  };

  return (
    <div className="w-1/2 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Hotel</h2>
      <Formik
        initialValues={editHotelInitValues}
        validationSchema={editHotelValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* Nombre del Hotel */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre del Hotel
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Ingrese el nombre del hotel"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                  handleFieldChange("name", e.target.value);
                }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Dirección */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dirección
              </label>
              <Field
                id="address"
                name="address"
                type="text"
                placeholder="Ingrese la dirección del hotel"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("address", e.target.value);
                  handleFieldChange("address", e.target.value);
                }}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Numero de estrellas */}
            <div>
              <label
                htmlFor="starsMichelin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de estrellas
              </label>
              <Field
                id="starsMichelin"
                name="starsMichelin"
                type="number"
                min="1"
                max="5"
                placeholder="Ingrese el número de estrellas"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("starsMichelin", e.target.value);
                  handleFieldChange("starsMichelin", e.target.value);
                }}
              />
              <ErrorMessage
                name="starsMichelin"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Número de Teléfono */}
            <div>
              <label
                htmlFor="numberPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de Teléfono
              </label>
              <Field
                id="numberPhone"
                name="numberPhone"
                type="number"
                placeholder="Ingrese el número de teléfono"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("numberPhone", e.target.value);
                  handleFieldChange("numberPhone", e.target.value);
                }}
              />
              <ErrorMessage
                name="numberPhone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Overview */}
            <div>
              <label
                htmlFor="overview"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Overview
              </label>
              <Field
                id="overview"
                name="overview"
                as="textarea"
                placeholder="Ingrese una breve descripción del hotel"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("overview", e.target.value);
                  handleFieldChange("overview", e.target.value);
                }}
              />
              <ErrorMessage
                name="overview"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Descripción */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descripción
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                placeholder="Ingrese la descripción del hotel"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("description", e.target.value);
                  handleFieldChange("description", e.target.value);
                }}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* URL de la Imagen */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL de la Imagen
              </label>
              <Field
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="Ingrese la URL de la imagen del hotel"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("imageUrl", e.target.value);
                  handleFieldChange("imageUrl", e.target.value);
                }}
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Editar Hotel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
