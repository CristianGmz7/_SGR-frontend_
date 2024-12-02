import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../security/store/useAuthStore";
import { toast } from "react-toastify";

export const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSideBarClick = () => {
    setIsExpanded((prev) => !prev);
  };

  //relacionado al cerrar sesión o iniciar sesión
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleLogout = () => {
    logout();
    toast.success("Ha cerrado su sesión");
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-10 flex flex-col items-center bg-blue-50 py-4 transition-all duration-300 shadow-lg ${
        isExpanded ? "w-48 px-4" : "w-14 px-2"
      } mt-16 rounded-r-lg border-r-2 border-blue-200`}
    >
      <p
        className="mb-8 cursor-pointer hidden sm:block text-blue-600 hover:text-blue-800 transition-colors duration-300"
        onClick={handleSideBarClick}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3L12 11L17 6L22 21H2Z" />
        </svg>
      </p>
      <nav className="flex flex-col justify-center items-center gap-6 flex-grow">
        {!isAuthenticated && (
          <div className="flex items-center gap-4 text-blue-600 hover:text-blue-800 transition-colors duration-300">
            <p
              className={`transition-opacity duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0"
              } hidden sm:inline text-blue-600 font-medium`}
            >
              Inicia sesión o regístrate para comenzar a reservar
            </p>
          </div>
        )}

        {isAuthenticated && (
          <a
            href="#"
            className="flex items-center gap-4 text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span
              className={`transition-opacity duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0"
              } hidden sm:inline text-blue-600 font-medium`}
            >
              Configuración
            </span>
          </a>
        )}

        {isAuthenticated && (
          <Link
            to={"/yourReservations"}
            className="flex items-center gap-4 text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            <span
              className={`transition-opacity duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0"
              } hidden sm:inline text-blue-600 font-medium`}
            >
              Ver reservas
            </span>
          </Link>
        )}

        {isAuthenticated ? (
          <div 
            className="flex items-center gap-4 text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer"
            onClick={handleLogout}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <polyline points="8 7 3 12 8 17" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            </svg>
            <span
              className={`transition-opacity duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0"
              } hidden sm:inline text-blue-600 font-medium`}
            >
              Cerrar sesión
            </span>
          </div>
        ) : (
          <>
            <Link
              to="/security/login"
              className="flex items-center gap-4 text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <span
                className={`transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                } hidden sm:inline text-blue-600 font-medium`}
              >
                Iniciar sesión
              </span>
            </Link>

            <Link
              to="#"
              className="flex items-center gap-4 text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z" />
                <path d="M5 20h14c0-3.9-3.1-7-7-7s-7 3.1-7 7z" />
                <line x1="18" y1="8" x2="22" y2="8" />
                <line x1="20" y1="6" x2="20" y2="10" />
              </svg>
              <span
                className={`transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                } hidden sm:inline text-blue-600 font-medium`}
              >
                Registrarse
              </span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
