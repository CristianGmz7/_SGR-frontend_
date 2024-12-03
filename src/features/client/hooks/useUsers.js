import { useState } from "react";
import { confirmPasswordUserToEditApi, editUserInfoApi, getUserLoggedApi } from "../../../shared/actions/users/users.action";

export const useUsers = () => {

  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUserData = async () => {
    setIsLoading(true);
    const result = await getUserLoggedApi();
    setUserData(result);
    setIsLoading(false);
  }

  // ----------------------------------------------------------------------------------------------------------------

  const editUserInfo = async (body) => {
    try {
      setIsLoading(true);
      const result = await editUserInfoApi(body)
      return result;

    } catch (error) {
      console.error("Error al editar la informacion:", error);
      setError(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------------------------------------------------------------------

  const [confirmPasswordData, setConfirmPasswordData] = useState({});
  const confirmPasswordUserToEdit = async (password) => {
    setIsLoading(true);
    const result = await confirmPasswordUserToEditApi(password);
    console.log(result)
    setConfirmPasswordData(result);
    setIsLoading(false);
    // try{
    //   setIsLoading(true);
    //   const result = await confirmPasswordUserToEditApi(password);
    //   setConfirmPasswordData(result);
    // }
    // catch(error){
    //   console.log(error)
    //   setError(error);
    // }
    // finally{
    //   setIsLoading(false);

    // }
  }

  // ----------------------------------------------------------------------------------------------------------------

  return {
    userData,
    isLoading,
    error,
    confirmPasswordData,

    loadUserData,
    editUserInfo,
    confirmPasswordUserToEdit
  }
}
