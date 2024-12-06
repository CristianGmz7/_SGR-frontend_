import { CircularProgress, Pagination } from "@mui/material";
import { useHotels, usePagination, usePaginationHotelsForUsers } from "../hooks";
import {
  CancellationPoliciesModal,
  HighlightedFeaturesModal,
  HotelCard,
} from "../components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Select from "react-select";
import { citiesHonduras, departmentsHonduras } from "../../../../public";

//COMENZAR A TRABAJAR LA NUEVA MIGRACION DE LA BASE DE DATOS PARA TRABAJAR LOS METODOS DEL GET Y LA DE LAS REACCIONES
export const HomePage = () => {
  const { hotelsData, isLoading, error, loadHotelsData } = useHotels();
  const {
    currentPage,
    searchTerm,
    moreFilters,
    handlePageChange,
    setFetching,
    handleSearchTermChange,
    handleSubmit,
    setMoreFilters
  } = usePaginationHotelsForUsers(loadHotelsData);

  // const [moreFilters, setMoreFilters] = useState({
  //   departmentFilter: { code: "", name: "" },
  //   cityFilter: "",
  //   starsFilter: 0,
  //   rangeReactions: { minRange: -1, maxRange: -1}
  // });

  const [homePageModals, setHomePageModals] = useState({
    showCancePoliModal: false,
    showHighLightedFeatures: false,
  });

  const optionsDepartments = departmentsHonduras.map((dp) => ({
    value: dp.code,
    label: dp.name,
  }));

  const optionsCities = citiesHonduras
    .filter(
      (ct) =>
        moreFilters.departmentFilter.code === "" || // Si no hay filtro, incluye todas las ciudades
        ct.departmentCode === moreFilters.departmentFilter.code // O si el código coincide
    )
    .map((ct) => ({
      value: ct.name,
      label: ct.name,
    }));

  const optionsStart = [
    { value: 0, label: "No interesa" },
    { value: 1, label: "⭐" },
    { value: 2, label: "⭐⭐" },
    { value: 3, label: "⭐⭐⭐" },
    { value: 4, label: "⭐⭐⭐⭐" },
    { value: 5, label: "⭐⭐⭐⭐⭐" },
  ];

  const optionsRangeReactions = [
    { value: {minRange: -1, maxRange: -1}, label: "No interesa" },
    { value: {minRange: 0, maxRange: 100}, label: "Al menos 100" },
    { value: {minRange: 101, maxRange: 500}, label: "101 - 500" },
    { value: {minRange: 501, maxRange: 2000}, label: "501 - 2000" },
    { value: {minRange: 2001, maxRange: -2000}, label: "Mas de 2000" },  //-2000 se manda se filtrarian todas aquellas que tengan mas de 2000
  ]

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenido a Hondu Reservas
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white rounded-lg mb-4"
        >
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
            <button
              type="submit"
              className="flex items-center bg-unah-yellow justify-center w-12 h-12 text-black rounded-r-lg"
            >
              <FaSearch className="h-6 w-6" />
            </button>
          </div>
        </form>

        {/* IMPLEMENTAR UNA FUNCION PARA EL ONSUBMIT NO OLVIDAR QUITAR EL PREVENTDEFAULT */}
        <form onSubmit={handleSubmit}>
          {/* Departamento */}
          <div>
            <label
              htmlFor="departmentHonduras"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Departamento
            </label>
            <Select
              id="departmentHonduras"
              options={optionsDepartments}
              placeholder="Buscar departamento a filtrar hoteles"
              noOptionsMessage={() =>
                error ? "Error cargando datos" : "No se encontraron resultados"
              }
              onChange={(option) => {
                setMoreFilters((prev) => ({
                  ...prev,
                  departmentFilter: {
                    code: option?.value,
                    name: option?.label,
                  } || { code: "", name: "" },
                }));
              }}
            />
          </div>
          {/* Ciudad */}
          <div>
            <label
              htmlFor="cityHonduras"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ciudad
            </label>
            <Select
              id="cityHonduras"
              options={optionsCities}
              placeholder="Buscar ciudad a filtrar hoteles"
              noOptionsMessage={() =>
                error ? "Error cargando datos" : "No se encontraron resultados"
              }
              onChange={(option) => {
                setMoreFilters((prev) => ({
                  ...prev,
                  cityFilter: option?.value || "",
                }));
              }}
            />
          </div>
          {/* Numero de estrellas */}
          <div>
            <label
              htmlFor="starsFilter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Numero de estrellas
            </label>
            <Select
              id="starsFilter"
              options={optionsStart}
              placeholder="Cantidad de estrellas a filtrar hoteles"
              noOptionsMessage={() =>
                error ? "Error cargando datos" : "No se encontraron resultados"
              }
              onChange={(option) => {
                setMoreFilters((prev) => ({
                  ...prev,
                  starsFilter: option?.value || 0,
                }));
              }}
            />
          </div>
          {/* Rango de reacciones positivas */}
          <div>
            <label
              htmlFor="rangeReactions"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rango de reacciones positivas
            </label>
            <Select
              id="rangeReactions"
              options={optionsRangeReactions}
              placeholder="Buscar rango de reacciones positvas a filtrar hoteles"
              noOptionsMessage={() =>
                error ? "Error cargando datos" : "No se encontraron resultados"
              }
              onChange={(option) => {
                setMoreFilters((prev) => ({
                  ...prev,
                  rangeReactions: {
                    minRange: option?.value?.minRange,
                    maxRange: option?.value?.maxRange,
                  } || { minRange: -1, maxRange: -1 },
                }));
              }}
            />
          </div>
          <button
            //añadir typesubmit
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Filtrar
          </button>
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
              onClick={() =>
                setHomePageModals((prev) => ({
                  ...prev,
                  showCancePoliModal: true,
                }))
              }
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
              onClick={() =>
                setHomePageModals((prev) => ({
                  ...prev,
                  showHighLightedFeatures: true,
                }))
              }
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
        onClose={() =>
          setHomePageModals((prev) => ({ ...prev, showCancePoliModal: false }))
        }
        visible={homePageModals.showCancePoliModal}
      />
      <HighlightedFeaturesModal
        onClose={() =>
          setHomePageModals((prev) => ({
            ...prev,
            showHighLightedFeatures: false,
          }))
        }
        visible={homePageModals.showHighLightedFeatures}
      />
    </div>
  );
};
