import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  newHotelInitValues,
  newHotelValidationSchema,
} from "../forms/hotel.data";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useHotels } from "../../admin/adminPage/hooks";
import { citiesHonduras, departmentsHonduras } from "../../../../public";
import Select from "react-select";
import { useAuthStore } from "../../security/store";

export const CreateHotelForm = ({ setHotelDto, hotelDto }) => {
  const {
    isLoading: isLoadingUseHotel,
    error: errorUseHotel,
    createHotel,
  } = useHotels();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState({
    code: "",
    name: "",
  });

  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    toast.success("Se cerrado su sesión, inicie sesión nuevamente");
  };

  const navigate = useNavigate();

  const handleFieldChange = (fieldName, value) => {
    setHotelDto((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const optionsDepartments = departmentsHonduras.map((dp) => ({
    value: dp.code,
    label: dp.name,
  }));

  const optionsCities = citiesHonduras
    .filter(
      (ct) =>
        selectedDepartment.code === "" || // Si no hay filtro, incluye todas las ciudades
        ct.departmentCode === selectedDepartment.code // O si el código coincide
    )
    .map((ct) => ({
      value: ct.name,
      label: ct.name,
    }));

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Enviando datos del formulario:", hotelDto);
    try {
      // console.log("Enviando datos del formulario:", values);

      const result = await createHotel(hotelDto)

      if(result.status){
        handleLogout();
        toast.success("Hotel creado exitosamente!");
        resetForm();
        // navigate('/home');
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
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Hotel</h2>
      <Formik
        initialValues={newHotelInitValues}
        validationSchema={newHotelValidationSchema}
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
            {/* Departamento */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Departamento
              </label>
              <Select
                id="department"
                options={optionsDepartments}
                placeholder="Buscar departamento"
                noOptionsMessage={() =>
                  error
                    ? "Error cargando datos"
                    : "No se encontraron resultados"
                }
                onChange={(option) => {
                  setSelectedDepartment(
                    (prev) =>
                      ({
                        code: option?.value,
                        name: option?.label,
                      } || { code: "", name: "" })
                  );

                  setFieldValue("department", option?.label);
                  handleFieldChange("department", option?.label);
                  setFieldValue("city", "");
                  handleFieldChange("city", "");
                }}
              />
              {values.department === "" && (
                <div className="text-red-500 text-sm">
                  El departamento es requerido
                </div>
              )}
            </div>
            {/* Ciudad */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ciudad
              </label>
              <Select
                id="city"
                options={optionsCities}
                placeholder="Buscar ciudad"
                noOptionsMessage={() =>
                  error
                    ? "Error cargando datos"
                    : "No se encontraron resultados"
                }
                onChange={(option) => {
                  setFieldValue("city", option?.label);
                  handleFieldChange("city", option?.label);
                }}
                value={
                  optionsCities.find(
                    (option) => option.label === values.city
                  ) || null
                } //si tira problema null dejar como ""
                isDisabled={selectedDepartment.code === ""}
              />
              {values.city === "" && (
                <div className="text-red-500 text-sm">
                  La ciudad es requerida
                </div>
              )}
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
              Crear Hotel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
