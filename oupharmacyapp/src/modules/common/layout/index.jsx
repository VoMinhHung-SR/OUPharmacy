import { Outlet, useLocation } from "react-router"
import Footer from "./components/footer"
import Nav from "./components/nav"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "@mui/material";
import LimitExamPerDay from "../../pages/HomeComponents/LimitExamPerDay";

const Layout = () => {
    const location = useLocation();
    const isHomepage = location.pathname === '/';

  return (
    <>
        <Nav/>
        <main className="ou-min-h-[550px] ou-relative ou-z-0 ou-mt-[62px]">
            {isHomepage ? (
            <Outlet />
            ) : (
            <Container>
                <Outlet />
            </Container>
            )}
        </main>
        <LimitExamPerDay/>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={1500} 
            pauseOnFocusLoss draggable pauseOnHover
            newestOnTop rtl={false}
        />
    </>
)
}
// export const DefaultLayout = ()  => (
//     <>
//         <Nav/>
//         <main className="ou-min-h-[550px] ou-relative ou-z-0 ou-mt-[62px]">
//             <Container>
//                 <Outlet/>
//             </Container>
//         </main>
//         <LimitExamPerDay/>
//         <Footer />
//         <ToastContainer position="bottom-right" autoClose={1500} 
//             pauseOnFocusLoss draggable pauseOnHover
//             newestOnTop rtl={false}
//         />
//     </>
// )

export default Layout   