export const HotelPreview = ({ hotelDto }) => {
  return (
    <div className="w-1/2 p-4 h-full">
      <div className="h-full overflow-y-auto">
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="p-6">
            <img
              src={hotelDto.imageUrl}
              alt={
                "No hay previsualizacion de la img " + `${hotelDto.name}` ||
                "Ingrese url de imagen"
              }
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <div className="flex mb-2">
              {/* {Array.from({ length: previewData.starsMichelin }).map((_, i) => ( */}
              {Array.from({
                length:
                  hotelDto.starsMichelin < 1 || hotelDto.starsMichelin > 5
                    ? 1
                    : hotelDto.starsMichelin,
              }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.75l-6.478 4.286 2.478-7.608-6-4.536 7.664-.056 2.336-7.336 2.336 7.336 7.664.056-6 4.536 2.478 7.608z" />
                </svg>
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {hotelDto.name || "Ingrese el nombre del hotel"}
            </h2>
            <p className="text-gray-500 mb-2">
              {hotelDto.address || "Ingrese la direccion"}
            </p>
            <p className="text-gray-500 mb-2">
              {hotelDto.city || "Ingrese la ciudad"}
            </p>
            <p className="text-gray-500 mb-2">
              {hotelDto.department || "Ingrese el departamento"}
            </p>
            <p className="font-semibold">
              {hotelDto.numberPhone || "Ingrese el numero de telefono"}
            </p>
            <p className="font-semibold mb-2">
              {hotelDto.overview || "Ingrese una descripcion breve"}
            </p>
            <p className="text-sm">
              {hotelDto.description || "Ingrese la descripcion del hotel"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
