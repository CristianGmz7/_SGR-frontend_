import { useState, useEffect } from "react";

//considerar que aqui falta que implementar metodos de busqueda
//este es pagination basico, solo necesita el numero de pagina
export const usePagination = (loadData) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadData(currentPage); // Carga los datos para la página actual
      setFetching(false); // Cambia el estado de fetching a false
    }
  }, [fetching, currentPage, loadData]);

  const handlePageChange = (_event, page) => {
    setCurrentPage(page); // Actualiza la página actual
    setFetching(true); // Establece fetching a true para cargar nuevos datos
  };

  return {
    currentPage,
    handlePageChange,
    setFetching,
  };
};

//SE PUEDEN TENER TANTAS PAGINACIONES COMO SE NECESITEN REALIZAR LAS BUSQUEDAS
  //¿no estoy seguro si este metodo ira a tener inconvenientes en otros lugares pero para cambiar fechas al crear reservas funciona muy bien? 
export const usePaginationGetRoomsByHotelAndBetweenDates = (loadData, filterStartDate, filterEndDate, hotelId) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  // console.log("filterStartDate", filterStartDate);
  // console.log("filterEndDate", filterEndDate);
  useEffect(() => {
    if (fetching) {
      loadData(hotelId, currentPage, filterStartDate, filterEndDate); // Carga los datos para la página actual
      setFetching(false); // Cambia el estado de fetching a false
    }
  }, [fetching, currentPage, loadData, hotelId, filterStartDate, filterEndDate]);

  const handlePageChange = (_event, page) => {
    setCurrentPage(page); // Actualiza la página actual
    setFetching(true); // Establece fetching a true para cargar nuevos datos
  };

  return {
    currentPage,
    handlePageChange,
    setFetching,
  };
}

export const useSinglePagination = (loadData, foreignId) => {

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadData(foreignId); // Carga los datos para la página actual
      setFetching(false); // Cambia el estado de fetching a false
    }
  }, [fetching, foreignId, loadData]);

  return {
    setFetching,
  };
}