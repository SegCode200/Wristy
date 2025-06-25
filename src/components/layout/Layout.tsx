import { Outlet } from "react-router-dom"
import Header from "../static/Header"


const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default Layout