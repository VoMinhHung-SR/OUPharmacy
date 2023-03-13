import { Outlet } from "react-router"
import Footer from "./components/footer"
import Nav from "./components/nav"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () =>(
    <>
        <Nav/>
        <main className="ou-min-h-[550px]">
            <Outlet/>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={1500} 
            pauseOnFocusLoss draggable pauseOnHover
            newestOnTop rtl={false}
        />
    </>
)

export default Layout   