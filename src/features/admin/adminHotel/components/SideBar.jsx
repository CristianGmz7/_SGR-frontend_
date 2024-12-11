import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../../security/store";
import { useDashboardAdminHotel } from "../hooks";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { MdOutlineDoorBack } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { LogoutIcon } from '../../../../shared/svgs';
import Tooltip from "@mui/material/Tooltip"; // Importar Tooltip de Material-UI

export const SideBar = () => {
  const { hotelIdNameData, isLoading, error, loadHotelIdName } = useDashboardAdminHotel();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadHotelIdName();
  }, []);

  const handleSideBarClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const logout = useAuthStore((state) => state.logout);

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
        {isExpanded ? (
          <TbLayoutSidebarRightExpandFilled className="w-6 h-6" />
        ) : (
          <TbLayoutSidebarLeftExpandFilled className="w-6 h-6" />
        )}
      </p>
      <nav className="flex flex-col justify-center items-center gap-6 flex-grow">
        {[
          {
            to: `/administrationHotelPage/dashboardHotelPage/roomsPage/${hotelIdNameData?.data?.id}`,
            icon: <MdOutlineDoorBack className="h-6 w-6" />,
            text: "Habitaciones",
          },
          {
            to: `/administrationHotelPage/dashboardHotelPage/additionalServicesPage/${hotelIdNameData?.data?.id}`,
            icon: <LuClipboardList className="h-6 w-6" />,
            text: "Serv. Adici",
          },
          {
            to: `/administrationHotelPage/dashboardHotelPage/reservationsPage/${hotelIdNameData?.data?.id}`,
            icon: <FaRegCalendarAlt className="h-6 w-6" />,
            text: "Reservas",
          },
          {
            to: `/administrationHotelPage/dashboardHotelPage/editHotel/${hotelIdNameData?.data?.id}`,
            icon: <HiMiniPencilSquare className="h-6 w-6" />,
            text: "Hotel",
          },
        ].map(({ to, icon, text }) => (
          <Tooltip key={text} title={!isExpanded ? text : ""} placement="right">
            <Link
              to={to}
              className="flex items-center gap-4 text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              {icon}
              {isExpanded && (
                <span className="text-blue-600 font-medium">{text}</span>
              )}
            </Link>
          </Tooltip>
        ))}

        <Tooltip title={!isExpanded ? "Cerrar sesión" : ""} placement="right">
          <div
            className="flex items-center gap-4 text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer"
            onClick={handleLogout}
          >
            <LogoutIcon />
            {isExpanded && (
              <span className="text-blue-600 font-medium">Cerrar sesión</span>
            )}
          </div>
        </Tooltip>
      </nav>
    </div>
  );
};
