import { Navigate, Route, Routes } from "react-router-dom"
import { Footer, Nav, SideBar } from "../../client/components"
import { LoginPage } from "../pages"

export const SecurityRouter = () => {
  return (
    <div className="overflow-x-hidden bg-gray-100 w-screen h-screen">
      <Nav/>
      <div className="px-6 py-8 flex">
        <SideBar/>
        <div className="flex-1 ml-14 md:ml-48">
          <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/*" element={<Navigate to={"/security/login"}/>}/>
          </Routes>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
