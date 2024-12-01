import { useState, useEffect } from "react";

//considerar que aqui falta que implementar metodos de busqueda
//este es pagination basico, solo necesita el numero de pagina
export const usePagination = (loadData) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadData(searchTerm, currentPage); // Carga los datos para la página actual
      setFetching(false); // Cambia el estado de fetching a false
    }
  }, [fetching, currentPage, loadData, searchTerm]);

  const handlePageChange = (_event, page) => {
    setCurrentPage(page); // Actualiza la página actual
    setFetching(true); // Establece fetching a true para cargar nuevos datos
  };

  const handleSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    setFetching(true);
  }

  const handleSubmit  = (e) => {
    e.preventDefault();    
    console.log('Buscando...');
    setFetching(true);
  }

  return {
    currentPage,
    searchTerm,
    handlePageChange,
    setFetching,
    handleSearchTermChange,
    handleSubmit
  };
};

//SE PUEDEN TENER TANTAS PAGINACIONES COMO SE NECESITEN REALIZAR LAS BUSQUEDAS
  //¿no estoy seguro si este metodo ira a tener inconvenientes en otros lugares pero para cambiar fechas al crear reservas funciona muy bien? 
export const usePaginationGetRoomsByHotelAndBetweenDates = (loadData, filterStartDate, filterEndDate, hotelId) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  // console.log("hotelId", hotelId);
  // console.log("filterStartDate", filterStartDate);
  // console.log("filterEndDate", filterEndDate);
  useEffect(() => {
    //añadio hotelId por la parte de editar reserva
    if (fetching && hotelId) {
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

export const usePaginationYourReservations = (loadData) => {
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
}

//este se usa para las rooms de admin hotel
export const usePaginationAdminHotel = (loadData, foreignId) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadData(foreignId, searchTerm, currentPage); // Carga los datos para la página actual
      setFetching(false); // Cambia el estado de fetching a false
    }
  }, [fetching, currentPage, loadData, searchTerm]);

  const handlePageChange = (_event, page) => {
    setCurrentPage(page); // Actualiza la página actual
    setFetching(true); // Establece fetching a true para cargar nuevos datos
  };

  const handleSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    setFetching(true);
  }

  const handleSubmit  = (e) => {
    e.preventDefault();    
    console.log('Buscando...');
    setFetching(true);
  }

  return {
    currentPage,
    searchTerm,
    handlePageChange,
    setFetching,
    handleSearchTermChange,
    handleSubmit
  };
}

//este se usa para ver todas las reservaciones de un hotel
export const usePaginationReservationsByHotel = (loadData, foreignId) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadData(foreignId, currentPage); // Carga los datos para la página actual
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
    setFetching
  }
}