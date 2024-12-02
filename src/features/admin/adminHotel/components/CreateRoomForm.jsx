import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { newRoomValidationSchema } from "../forms";
import { useRooms } from "../hooks";

export const CreateRoomForm = ({ setRoomDto, roomDto }) => {
  const { isLoading, error, createRoom } = useRooms();

  const navigate = useNavigate();

  const handleFieldChange = (fieldName, value) => {
    setRoomDto((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Enviando datos del formulario:", roomDto);

    try {
      // console.log("Enviando datos del formulario:", values);
      // console.log("Enviando datos del formulario:", roomDto);

      const result = await createRoom(roomDto)

      if(result.status){
        toast.success("Hotel creado exitosamente!");
        resetForm();
        navigate('/administrationHotelPage/dashboardHotelPage');
      }else{
        toast.error(result.message);
      }

    } catch (error) {
      console.error("Error creating hotel:", error);
      toast.error("Ocurrió un error al crear el hotel");
    }
  };

  return (
    <div className="w-1/2 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Crear Nueva Habitación</h2>
      <Formik
        initialValues={roomDto}
        validationSchema={newRoomValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* Numero de Habitacion */}
            <div>
              <label
                htmlFor="numberRoom"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Numero de habitación
              </label>
              <Field
                id="numberRoom"
                name="numberRoom"
                type="number"
                placeholder="Ingrese el numero de habitación"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("numberRoom", e.target.value);
                  handleFieldChange("numberRoom", e.target.value);
                }}
              />
              <ErrorMessage
                name="numberRoom"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Precio por noche */}
            <div>
              <label
                htmlFor="priceNight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Precio por noche
              </label>
              <Field
                id="priceNight"
                name="priceNight"
                type="number"
                placeholder="Ingrese el precio por noche"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("priceNight", e.target.value);
                  handleFieldChange("priceNight", e.target.value);
                }}
              />
              <ErrorMessage
                name="priceNight"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Tipo de Habitación */}
            <div>
              <label
                htmlFor="typeRoom"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Habitación
              </label>
              <Field
                as="select"
                id="typeRoom"
                name="typeRoom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("typeRoom", e.target.value);
                  handleFieldChange("typeRoom", e.target.value);
                }}
              >
                <option value="" label="Seleccione el tipo de habitación" />
                <option value="SENCILLA" label="SENCILLA" />
                <option value="DOBLE" label="DOBLE" />
                <option value="SUITE" label="SUITE" />
              </Field>
              <ErrorMessage
                name="typeRoom"
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
                placeholder="Ingrese la URL de la imagen de la habitación"
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
              Crear Habitación
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
