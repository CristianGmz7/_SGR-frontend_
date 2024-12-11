import { Link } from "react-router-dom";
import { StarClientPageIcon } from '../../../shared/svgs'
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

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
              <StarClientPageIcon key={index} className="w-5  h-5 fill-primary" />
            ))}
          </div>
          <h3 className="text-2xl font-bold">{hotel.name}</h3>
        </div>
        <p className="text-gray-800 text-sm mb-4">{hotel.address}</p>
        <p className="text-gray-700 text-sm h-[60px]">{hotel.overview}</p>
        <div className="flex gap-2">
          <AiOutlineLike className="h-5 w-5" />
          <p className="text-gray-700 text-sm">{hotel.totalLikes}</p>
        </div>
        <div className="flex gap-2">
          <AiOutlineDislike className="h-5 w-5" />
          <p className="text-gray-700 text-sm">{hotel.totalDislikes}</p>
        </div>
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
