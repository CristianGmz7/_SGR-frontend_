import * as Yup from 'yup';

export const editUserInformationValidationSchema = Yup.object({
  firstName: Yup.string(),
  lastName: Yup.string(),
  profilePictureUrl: Yup.string(),
  newEmail: Yup.string(), 
  oldEmail: Yup.string(),
  newPassword: Yup.string(),
  oldPassword: Yup.string(),
})