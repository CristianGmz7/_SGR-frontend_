
import { CircularProgress, Pagination } from "@mui/material";
import { useHotels, usePagination } from "../hooks";
import { CancellationPoliciesModal, HighlightedFeaturesModal, HotelCard } from "../components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export const HomePage = () => {
  // const { handlePageChange, page } = usePagination();
  // const { paginatedHotels, loading, error } = useHotel(page);

  const { hotelsData, isLoading, error, loadHotelsData } = useHotels();
  const { currentPage, searchTerm, handlePageChange, setFetching, handleSearchTermChange, handleSubmit } = usePagination(loadHotelsData);

  const [homePageModals, setHomePageModals] = useState({
    showCancePoliModal: false,
    showHighLightedFeatures: false,
  })

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenido a Hondu Reservas
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-lg mb-4">
          <div className="w-full">
            <input 
              value={searchTerm}
              onChange={(e) => handleSearchTermChange(e.target.value)}
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="Buscar Hoteles"
            />
          </div>
          <div>
            <button type="submit"
            className="flex items-center bg-unah-yellow justify-center w-12 h-12 text-black rounded-r-lg" >
              <FaSearch className="h-6 w-6" />
            </button>
          </div>
        </form>

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
              contacto.
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
            <button
              onClick={() => setHomePageModals((prev) => ({...prev, showCancePoliModal:true}))}
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
            text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Ver política
            </button>
          </div>
          <div className="características-destacadas">
            <h3 className="text-xl font-bold mb-2">
              Características destacadas
            </h3>
            <p className="text-muted-foreground mb-4">
              Descubre las características que hacen de nuestros hoteles una
              experiencia única.
            </p>
            <button
              onClick={() => setHomePageModals((prev) => ({...prev, showHighLightedFeatures:true}))}
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
              text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Ver características
            </button>
          </div>
        </div>
      </section>
      <CancellationPoliciesModal
        onClose={() => setHomePageModals((prev) => ({...prev, showCancePoliModal: false}))} 
        visible={homePageModals.showCancePoliModal}
      />
      <HighlightedFeaturesModal 
        onClose={() => setHomePageModals((prev) => ({...prev, showHighLightedFeatures: false}))} 
        visible={homePageModals.showHighLightedFeatures}
      />
    </div>
  );
};

