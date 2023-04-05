import { Outlet } from "react-router"
import Footer from "./components/footer"
import Nav from "./components/nav"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "@mui/material";
import LimitExamPerDay from "../../pages/HomeComponents/LimitExamPerDay";

const Layout = () => (
    <>
        <Nav/>
        <main className="ou-min-h-[550px] ou-relative ou-z-0">
            <Container>
                <Outlet/>
            </Container>
        </main>
        <LimitExamPerDay/>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={1500} 
            pauseOnFocusLoss draggable pauseOnHover
            newestOnTop rtl={false}
        />
    </>
)

export default Layout   