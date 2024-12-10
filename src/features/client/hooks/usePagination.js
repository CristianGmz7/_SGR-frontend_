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
  const [moreFilters, setMoreFilters] = useState({
    priceMin: -1,
    priceMax: -1,
    typeRoom: "",
  });

  useEffect(() => {
    //añadio hotelId por la parte de editar reserva
    if (fetching && hotelId) {
      loadData(hotelId, currentPage, filterStartDate, filterEndDate, moreFilters.priceMin, moreFilters.priceMax, moreFilters.typeRoom); // Carga los datos para la página actual
      setFetching(false); // Cambia el estado de fetching a false
    }
  }, [fetching, currentPage, loadData, hotelId, filterStartDate, filterEndDate, moreFilters.priceMin, moreFilters.priceMax, moreFilters.typeRoom]);

  const handlePageChange = (_event, page) => {
    setCurrentPage(page); // Actualiza la página actual
    setFetching(true); // Establece fetching a true para cargar nuevos datos
  };

  return {
    currentPage,
    moreFilters,
    setMoreFilters,
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

export const usePaginationHotelsForUsers = (loadData) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [moreFilters, setMoreFilters] = useState({
    departmentFilter: { code: "", name: "" },
    cityFilter: "",
    starsFilter: 0,
    rangeReactions: { minRange: -1, maxRange: -1}
  });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadData(searchTerm, currentPage, moreFilters.starsFilter, moreFilters.departmentFilter.name, moreFilters.cityFilter, moreFilters.rangeReactions.minRange, moreFilters.rangeReactions.maxRange); // Carga los datos para la página actual
      setFetching(false); // Cambia el estado de fetching a false
    }
  }, [fetching, currentPage, loadData, searchTerm, moreFilters.starsFilter, moreFilters.departmentFilter.name, moreFilters.cityFilter, moreFilters.rangeReactions.minRange, moreFilters.rangeReactions.maxRange]);

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
    console.log(moreFilters)    
    console.log('Buscando...');
    setFetching(true);
  }

  return {
    currentPage,
    searchTerm,
    moreFilters,

    handlePageChange,
    setFetching,
    handleSearchTermChange,
    handleSubmit,
    setMoreFilters
  };
}