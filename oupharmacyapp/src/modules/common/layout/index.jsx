import { Outlet } from "react-router"
import Footer from "./components/footer"
import Nav from "./components/nav"

const Layout = () =>(
    <>
        <Nav/>
        <main className="ou-min-h-[550px]">
            <Outlet/>
        </main>
        <Footer />
    </>
)

export default Layout