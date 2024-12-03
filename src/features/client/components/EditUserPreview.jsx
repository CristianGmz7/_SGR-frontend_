export const EditUserPreview = ({editUserDto, editUserInitValues}) => {

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden">
        {editUserDto.profilePictureUrl ? (
          <img
            src={editUserDto.profilePictureUrl === "" ? editUserInitValues.profilePictureUrl : editUserDto.profilePictureUrl}
            alt={`${editUserDto.firstName} ${editUserDto.lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-gray-500">
            {editUserDto.firstName[0]}{editUserDto.lastName[0]}
          </span>
        )}
      </div>
      <h2 className="text-xl font-semibold">{editUserDto.firstName === "" ? editUserInitValues.firstName : editUserDto.firstName}</h2>
      <p className="text-lg text-gray-500">{editUserDto.lastName === "" ? editUserInitValues.lastName : editUserDto.lastName}</p>
    </div>
  );
}
