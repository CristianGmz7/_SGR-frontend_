import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import { sgrApi } from "../../../../config/api";
import {
  newHotelInitValues,
  newHotelValidationSchema,
} from "../forms/hotel.data";
import { FaSearch } from "react-icons/fa";
import { components } from "react-select";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useHotels } from "../hooks";

export const CreateHotelForm = ({setHotelDto, hotelDto}) => {

  const { isLoading:isLoadingUseHotel, error:errorUseHotel, createHotel } = useHotels()

  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleFieldChange = (fieldName, value) => {
    setHotelDto((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const fetchUsers = async (searchTerm) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await sgrApi.get(
        `/users/allUsersWithUserRole?searchTerm=${searchTerm}`
      );
      setUsersData(data?.data || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data || "Error fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchTermChange = (inputValue, actionMeta) => {
    if (actionMeta.action === "input-change") {
      setSearchTerm(inputValue);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchUsers(searchTerm);
    } else {
      setUsersData([]);
    }
  }, [searchTerm]);

  //esto es lo que sale cuando se busca en el Select
  const options = usersData.map((user) => ({
    value: user.id,
    label: (
      <div key={user.id} className="flex items-center">
        <img
          src={user.profilePictureUrl}
          alt={user.id}
          className="w-8 h-8 rounded-full mr-2"
        />
        {user.fullName}
      </div>
    ),
  }));

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // console.log("Enviando datos del formulario:", values);
      console.log("Enviando datos del formulario:", hotelDto);

      const result = await createHotel(hotelDto)

      if(result.status){
        toast.success("Hotel creado exitosamente!");
        resetForm();
        navigate('/administrationPage/dashboardAdminPage');
      }else{
        toast.error(result.message);
      }

    } catch (error) {
      console.error("Error creating hotel:", error);
      toast.error("Ocurrió un error al crear el hotel");
    }
  };

  // Define el nuevo DropdownIndicator usando React Icons
const CustomDropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <FaSearch className="text-gray-500 w-5 h-5" />
  </components.DropdownIndicator>
);

  return (
    <div className="w-1/2 p-4 overflow-y-auto">
        <div>
          <Link
            //a medida se coloquen numeros se regresa la cantidad de "nodos" que se especifique
            to={-1}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Regresar
          </Link>
        </div>
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
            {/* Usuario Administrador */}
            <div>
              <label
                htmlFor="adminUserId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Usuario Administrador
              </label>
              <Select
                id="adminUserId"
                options={options}
                isLoading={isLoading}
                onInputChange={handleSearchTermChange}
                onChange={(option) => {
                  setFieldValue("adminUserId", option?.value || "")
                  handleFieldChange("adminUserId", option?.value || "");
                }
                }
                placeholder="Buscar al usuario administrador del hotel"
                noOptionsMessage={() =>
                  error
                    ? "Error cargando datos"
                    : "No se encontraron resultados"
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    minHeight: "60px", // Altura mínima para aumentar el tamaño
                    fontSize: "11px", // Tamaño de la fuente
                  }),
                  input: (provided) => ({
                    ...provided,
                    height: "auto",
                  }),
                }}
                menuPlacement="top"
                components={{ DropdownIndicator: CustomDropdownIndicator}}
              />
              {values.adminUserId === "" && (
                <div className="text-red-500 text-sm">
                  El usuario administrador es requerido
                </div>
              )}
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

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}