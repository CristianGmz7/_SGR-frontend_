import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../security/store/useAuthStore";
import { toast } from "react-toastify";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { GearIcon, CalendarIcon, LogoutIcon, LoginIcon, RegisterIcon } from '../../../shared/svgs';
import Tooltip from "@mui/material/Tooltip";

export const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSideBarClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleLogout = () => {
    logout();
    toast.success("Ha cerrado su sesión");
  };

  const navItems = [
    {
      to: "/editUserInformation",
      icon: <GearIcon />,
      label: "Config. cuenta",
      show: isAuthenticated,
    },
    {
      to: "/yourReservations",
      icon: <CalendarIcon />,
      label: "Ver reservas",
      show: isAuthenticated,
    },
    {
      onClick: handleLogout,
      icon: <LogoutIcon />,
      label: "Cerrar sesión",
      show: isAuthenticated,
    },
    {
      to: "/security/login",
      icon: <LoginIcon />,
      label: "Iniciar sesión",
      show: !isAuthenticated,
    },
    {
      to: "/security/register",
      icon: <RegisterIcon />,
      label: "Registrarse",
      show: !isAuthenticated,
    },
  ];

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
        {isExpanded ? (
          <TbLayoutSidebarRightExpandFilled className="w-6 h-6" />
        ) : (
          <TbLayoutSidebarLeftExpandFilled className="w-6 h-6" />
        )}
      </p>
      <nav className="flex flex-col justify-center items-center gap-6 flex-grow">
        {navItems
          .filter((item) => item.show)
          .map((item, index) => (
            <Tooltip
              key={index}
              title={isExpanded ? "" : item.label}
              placement="right"
              arrow
            >
              <Link
                to={item.to || "#"}
                onClick={item.onClick}
                className="flex items-center gap-4 text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                {item.icon}
                {isExpanded && (
                  <span className="text-blue-600 font-medium">{item.label}</span>
                )}
              </Link>
            </Tooltip>
          ))}
      </nav>
    </div>
  );
};
