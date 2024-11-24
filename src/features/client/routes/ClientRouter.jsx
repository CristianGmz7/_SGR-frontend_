import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages"
import { Footer } from "../components/Footer"
import { Nav } from "../components/Nav"
import { SideBar } from "../components/SideBar"

export const ClientRouter = () => {
  return (
    <div className="overflow-x-hidden bg-gray-100 w-screen h-screen">
      <Nav />
      <div className="px-6 py-8 flex">
        <SideBar />
        <div className="flex-1 ml-14 md:ml-48">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            {/* Ruta del context */}
            {/* Ruta home */}
            {/* Ruta home */}
            {/* Ruta home */}
            {/* Ruta home */}
            {/* Ruta home */}
            {/* Ruta home */}
            <Route path="/*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}
