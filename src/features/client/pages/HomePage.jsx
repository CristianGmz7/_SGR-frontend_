
import { CircularProgress, Pagination } from "@mui/material";
import { useHotels, usePagination } from "../hooks";
import { HotelCard } from "../components";

export const HomePage = () => {
  // const { handlePageChange, page } = usePagination();
  // const { paginatedHotels, loading, error } = useHotel(page);

  const { hotelsData, isLoading, error, loadHotelsData } = useHotels();
  const { currentPage, handlePageChange, setFetching } = usePagination(loadHotelsData);

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenidos al Sistema de Gestión de Reservas de Hotel
        </h1>
        <section className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
            <CircularProgress />
          </div>
          ) : (
            hotelsData?.data?.items?.map((hotel) => (
              <HotelCard key={hotel?.id} hotel={hotel} />
            ))
          )}
        </section>
      </div>
      <div className="flex flex-row justify-center items-center">
        <Pagination
        //con la pagibación que viene de useHotels y que viene de hotelcAction 
          count={hotelsData?.data?.totalPages}
          page={hotelsData?.data?.currentPage}
          // onChange={(_event, page) => handlePageChange(page)}
          onChange={handlePageChange}
          key={hotelsData?.data?.currentPage}
        />
      </div>
      {/* Fin de paginación */}

      <section className="mt-12 md:mt-16 lg:mt-20 px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6">Más información</h2>
        <div className="información grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="contacto">
            <h3 className="text-xl font-bold mb-2">Contacto</h3>
            <p className="text-muted-foreground mb-4">
              Puedes comunicarte con nosotros a través de nuestro formulario de
              contacto o por teléfono.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
              text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Contactar
            </a>
          </div>
          <div className="política-cancelación">
            <h3 className="text-xl font-bold mb-2">Política de cancelación</h3>
            <p className="text-muted-foreground mb-4">
              Conoce nuestras políticas de cancelación y modificación de
              reservas.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
            text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Ver política
            </a>
          </div>
          <div className="características-destacadas">
            <h3 className="text-xl font-bold mb-2">
              Características destacadas
            </h3>
            <p className="text-muted-foreground mb-4">
              Descubre las características que hacen de nuestros hoteles una
              experiencia única.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
              text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Ver características
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

