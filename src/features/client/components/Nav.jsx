import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProtectedComponentAdminPage } from "../../../shared/components/ProtectedComponentAdminPage";
import { rolesListConstant } from "../../../shared/constants/roles-list.constant";
import { ProtectedComponentHotelPage } from "../../../shared/components/ProtectedComponentHotelPage";
import { ProtectedComponentUserPage } from "../../../shared/components/ProtectedComponentUserPage";
import { HamburgerMenu } from '../../../shared/svgs'

export const Nav = () => {

  const navUser = JSON.parse(localStorage.getItem('navUserLogged') || '{}');
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="w-full bg-blue-50 border-b border-blue-200 shadow-lg fixed top-0 z-20">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        <Link
          to="/home"
          className="text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          Hondu Reservas
        </Link>
        <div className="flex items-center gap-4">
          {/* ESTE ES EL NAV CUANDO SE ENCUENTRA EN PANTALLAS HORIZONTALES O PCS */}
          <nav className="hidden md:flex md:gap-6 lg:gap-8">
            <ProtectedComponentAdminPage
              requiredRoles={[rolesListConstant.PAGEADMIN]}
            >
              <Link
                to={"/administrationPage/dashboardAdminPage"}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Administración Pagina
              </Link>
            </ProtectedComponentAdminPage>

            <ProtectedComponentHotelPage
              requiredRoles={[rolesListConstant.HOTELADMIN]}
            >
              <Link
                to={"/administrationHotelPage/dashboardHotelPage"}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Administración Hotel
              </Link>
            </ProtectedComponentHotelPage>

            <Link
              to={"/home"}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Inicio
            </Link>

            <ProtectedComponentUserPage requiredRoles={[rolesListConstant.USER]}>
              <Link
                to={"/createHotel"}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Crea tu Hotel
              </Link>
            </ProtectedComponentUserPage>
          </nav>
          <button
            type="button"
            className="md:hidden text-blue-600 hover:text-blue-800 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HamburgerMenu />
            <span className="sr-only">Toggle navigation</span>
          </button>
          {/* ESTE ES EL NAV CUANDO ESTA EN PANTALLAS PEQUEÑAS */}
          {isOpen && (
            <div
              ref={menuRef}
              className="absolute top-0 left-0 w-full bg-blue-50 p-4 shadow-lg rounded-b-lg"
            >
              <nav className="grid gap-4 py-6 px-4">
                <ProtectedComponentAdminPage
                  requiredRoles={[rolesListConstant.PAGEADMIN]}
                >
                  <Link
                    to={"/administrationPage/dashboardAdminPage"}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    Administración Pagina
                  </Link>
                </ProtectedComponentAdminPage>

                <ProtectedComponentHotelPage
                  requiredRoles={[rolesListConstant.HOTELADMIN]}
                >
                  <Link
                    to={"/administrationHotelPage/dashboardHotelPage"}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    Administración Hotel
                  </Link>
                </ProtectedComponentHotelPage>

                <Link
                  to={"/home"}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  Inicio
                </Link>
                <ProtectedComponentUserPage
                  requiredRoles={[rolesListConstant.USER]}
                >
                  <Link
                    to={"/createHotel"}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    Crea tu Hotel
                  </Link>
                </ProtectedComponentUserPage>
              </nav>
            </div>
          )}
          {/* AQUI NECESITO RENDERIZAR SI ESTA LOGUEADO O NO */}
          {
            Object.keys(navUser).length === 0
            ? (
            <Link
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
              // onClick={() => navigateToLogin()} // Aquí puedes implementar tu lógica para redirigir al login
              to="/security/login"
            >
              Iniciar Sesión
            </Link>
            )
            : (
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => {navigate("/editUserInformation")}}
            >
              <img
                src={navUser.profilePictureUrl || "https://via.placeholder.com/40"} // Avatar del usuario o un placeholder
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-sm font-medium text-blue-600 truncate max-w-xs">
                {navUser.fullName || "Usuario Anónimo"}
              </p>
            </div>
            )
          }
        </div>
      </div>
    </header>
  );
};
