import { Link } from "react-router-dom";

export const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg">
      <img
        src={hotel.imageUrl}
        alt="Hotel 1"
        width={600}
        height={400}
        className="w-full h-60 object-cover"
      />
      <div className="p-6">
        <div className="columns-1">
          <div className="flex">
            {/* Crear un nuevo array cuyo tamaño es igual al número de estrellas Michellin del hotel */}
            {Array.from({ length: hotel.starsMichelin }).map((_, index) => (
              <StarIcon key={index} className="w-5  h-5 fill-primary" />
            ))}
          </div>
          <h3 className="text-2xl font-bold">{hotel.name}</h3>
        </div>
        <p className="text-gray-700 text-sm mb-4">{hotel.address}</p>
        <p className="text-gray-500 text-sm h-[60px]">{hotel.overview}</p>
        <p className="text-gray-500 text-sm">Total Likes {hotel.totalLikes}</p>
        <p className="text-gray-500 text-sm">Total Dislikes {hotel.totalDislikes}</p>
        <Link
          to={`/hotelRoomList/${hotel.id}`}
          className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 text-white 
          font-medium transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600
            focus:ring-offset-2"
        >
          Ver habitaciones
        </Link>
      </div>
    </div>
  );
};

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-current"
      fill="yellow"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
