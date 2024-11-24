import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="px-6 py-10 bg-blue-50">
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
        <Link to="/home"
          className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300 md:ml-60"
          href="#"
        >
          Hondu-Reservas
        </Link>
        <p className="mt-2 text-sm text-blue-600 md:mt-0 md:ml-40">
          Todos los derechos reservados 2024
        </p>
      </div>
    </footer>
  );
}
