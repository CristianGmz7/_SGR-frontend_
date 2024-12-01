export const UserProfileCard = ({ id, fullName, email, profilePictureUrl }) => {
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden">
            {profilePictureUrl ? (
              <img
                src={profilePictureUrl}
                alt={`${fullName}'s profile picture`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                {fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
