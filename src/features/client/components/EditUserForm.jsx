import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { editUserInformationValidationSchema } from "../forms/";
import { useAuthStore } from "../../security/store";
import { useUsers } from "../hooks";
import { useNavigate } from "react-router-dom";

//falta que llamar la peticion que verifiqué la contraseña para que aparezcan las opciones de editar contraseña y email
export const EditUserForm = ({
  setEditUserDto,
  editUserDto,
  editUserInitValues,
  isLoading,
  error,
  editUserInfo,
}) => {
  const { confirmPasswordUserToEdit, confirmPasswordData } = useUsers();
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Ha cerrado su sesión");
  };

  const handleFieldChange = (fieldName, value) => {
    setEditUserDto((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleConfirmPasswordToEdit = async (e, password) => {
    e.preventDefault();
    const result = await confirmPasswordUserToEdit(password); //POR ALGUNA RAZON TIRA UNDEFINED
    // result = confirmPasswordData;
    console.log(result);

    if (confirmPasswordData.status) {
      toast.success(confirmPasswordData.message);
    } else {
      toast.error(confirmPasswordData.message);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Enviando datos del formulario:", editUserDto);

      try {

      const result = await editUserInfo(editUserDto);

      if(result.status){
        toast.success("Información editado exitosamente!");
        resetForm();
        handleLogout();     //cerrar sesion
        //navigate('/security/login')   //NO FUNCIONA POR ALGUNA RAZON AUNQUE SE VACIE EL LOCALSTORAGE SIEMPRE TIRA AL HOME
      }else{
        toast.error(result.message);
      }

    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error("Ocurrió un error al editar su información");
    }
  };

  return (
    <div className="w-2/3 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Edita tu información</h2>
      <Formik
        initialValues={editUserInitValues}
        validationSchema={editUserInformationValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {/* nombres */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombres
              </label>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Ingrese sus nombres"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("firstName", e.target.value);
                  handleFieldChange("firstName", e.target.value);
                }}
              />
            </div>
            {/* Apellidos */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apellidos
              </label>
              <Field
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Ingrese sus apellidos"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("lastName", e.target.value);
                  handleFieldChange("lastName", e.target.value);
                }}
              />
            </div>
            {/* Foto del perfil */}
            <div>
              <label
                htmlFor="profilePictureUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Foto de perfil
              </label>
              <Field
                id="profilePictureUrl"
                name="profilePictureUrl"
                type="url"
                placeholder="Ingrese URL de su foto de perfil"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("profilePictureUrl", e.target.value);
                  handleFieldChange("profilePictureUrl", e.target.value);
                }}
              />
            </div>
            {/* <p className="text-sm text-gray-600 mt-2">
              Si quieres cambiar información de seguridad como su contraseña u
              email por favor ingrese su contraseña
            </p> */}
            {/* <button
              type="button"   //se deja en button para que no se dispare el formulario
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={(e) => handleConfirmPasswordToEdit(e, editUserDto.oldPassword)}
            >
              Confirmar contraseña
            </button> */}
            {/* Contraseña actual*/}
            {/* <div>
              <label
                htmlFor="profilePictureUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña actual
              </label>
              <Field
                id="oldPassword"
                name="oldPassword"
                type="password"
                placeholder="Ingrese su contraseña actual"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setFieldValue("oldPassword", e.target.value);
                  handleFieldChange("oldPassword", e.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                  }
                }}
              />
            </div> */}
            {confirmPasswordData.data && (
              <>
              </>
              // <>
              //   {/* CORREO ELECTRONICO ACTUAL */}
              //   <div>
              //     <label
              //       htmlFor="profilePictureUrl"
              //       className="block text-sm font-medium text-gray-700 mb-1"
              //     >
              //       Correo electronico actual
              //     </label>
              //     <Field
              //       id="oldEmail"
              //       name="oldEmail"
              //       type="email"
              //       placeholder="Ingrese su nuevo correo electronico"
              //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              //       onChange={(e) => {
              //         setFieldValue("oldEmail", e.target.value);
              //         handleFieldChange("oldEmail", e.target.value);
              //       }}
              //     />
              //   </div>
              //   {/* NUEVO CORREO ELECTRONICO */}
              //   <div>
              //     <label
              //       htmlFor="profilePictureUrl"
              //       className="block text-sm font-medium text-gray-700 mb-1"
              //     >
              //       Correo electronico nuevo
              //     </label>
              //     <Field
              //       id="newEmail"
              //       name="newEmail"
              //       type="email"
              //       placeholder="Ingrese su nuevo correo electronico"
              //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              //       onChange={(e) => {
              //         setFieldValue("newEmail", e.target.value);
              //         handleFieldChange("newEmail", e.target.value);
              //       }}
              //     />
              //   </div>

              //   {/* NUEVA CONTRASEÑA */}
              //   <div>
              //     <label
              //       htmlFor="profilePictureUrl"
              //       className="block text-sm font-medium text-gray-700 mb-1"
              //     >
              //       Contraseña nueva
              //     </label>
              //     <Field
              //       id="newPassword"
              //       name="newPassword"
              //       type="password"
              //       placeholder="Ingrese su contraseña actual"
              //       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              //       onChange={(e) => {
              //         setFieldValue("newPassword", e.target.value);
              //         handleFieldChange("newPassword", e.target.value);
              //       }}
              //     />
              //   </div>
              // </>
            )}
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Editar informacion
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
