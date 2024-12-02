import { useState } from "react";
import { getAllUsersWithUserRoleApi } from "../../../../shared/actions/users/users.action";

export const useUsers = () => {
  const [usersData, setUsersData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsersData = async (searchTerm) => {
    setIsLoading(true);
    const result = await getAllUsersWithUserRoleApi(searchTerm);
    setUsersData(result)
    setIsLoading(false);
  }

  return {
    usersData,
    isLoading,
    error,

    loadUsersData
  }
}