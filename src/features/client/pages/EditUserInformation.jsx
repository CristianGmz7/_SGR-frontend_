import { useEffect, useState } from "react";
import { useUsers } from "../hooks"
import { CircularProgress } from "@mui/material";
import { EditUserForm, EditUserPreview } from "../components";

export const EditUserInformation = () => {

  const { userData, isLoading, error, loadUserData, editUserInfo } = useUsers();
  const [editUserInitValues, setEditUserInitValues] = useState(null);
  const [editUserDto, setEditUserDto] = useState(null);

  useEffect(() => {
    loadUserData();
    setEditUserInitValues(userData?.data);
    setEditUserDto(userData?.data)
  }, [])

  useEffect(() => {
    if (userData?.data) {
      setEditUserInitValues({
        firstName: userData.data.firstName,
        lastName: userData.data.lastName,
        profilePictureUrl: userData.data.profilePictureUrl,
        newEmail: "",
        oldEmail: "",
        newPassword: "",
        oldPassword: "",
      });
      // setHotelDto(hotelData.data);
      setEditUserDto(editUserInitValues);
    }
  }, [userData]);

  if (isLoading || !editUserInitValues || !editUserDto) {
    return (
      <div className="flex flex-auto justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <EditUserForm setEditUserDto={setEditUserDto} editUserDto={editUserDto} editUserInitValues={editUserInitValues}
        isLoading={isLoading} error={error} editUserInfo={editUserInfo}
      />
      {editUserDto && <EditUserPreview editUserDto={editUserDto} editUserInitValues={editUserInitValues}/>}
    </div>
  )
}
