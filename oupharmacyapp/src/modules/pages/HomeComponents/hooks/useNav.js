import Cookies from "js-cookie";
import { useContext } from "react";
import { userContext } from "../../../../App";
import { useNavigate } from "react-router";
const useNav = () =>{
    const [user, dispatch] = useContext(userContext);
    const router = useNavigate();

    const handleLogout = () =>{
        Cookies.remove('token')
        Cookies.remove('user')
        Cookies.remove('refresh_token')
        if (user !== null)
            dispatch({
                "type": "logout",
                "payload": null
        })

        return router('/login')
    }

    return {
        user,
        handleLogout
    }
}
export default useNav;