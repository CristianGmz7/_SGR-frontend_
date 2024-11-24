import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="w-full bg-blue-50 border-b border-blue-200 shadow-lg relative z-20">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        <Link to="/home" href="#" className="text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
          Hondu Reservas
        </Link>
        <nav className="hidden md:flex md:gap-6 lg:gap-8">
          <Link 
            to={"/home"}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            Inicio
          </Link>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
            Contacto
          </a>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
            Preguntas Frecuentes
          </a>
        </nav>
        <button 
          type='button'
          className="md:hidden text-blue-600 hover:text-blue-800 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"></path>
          </svg>
          <span className="sr-only">Toggle navigation</span>
        </button>
        {isOpen && (
          <div ref={menuRef} className="absolute top-0 left-0 w-full bg-blue-50 p-4 shadow-lg rounded-b-lg">
            <nav className="grid gap-4 py-6 px-4">
              <Link 
                to={"/home"}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Inicio
              </Link>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
                Contacto
              </a>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
                Preguntas Frecuentes
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
