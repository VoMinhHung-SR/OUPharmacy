import { useContext } from "react";
import { userContext } from "../../../../App";
import cookies from "react-cookies";

const useNav = () =>{
    const [user, dispatch] = useContext(userContext);
     
    const handleLogout = () =>{
        cookies.remove('token')
        cookies.remove('user')
        cookies.remove('refresh_token')
        if (user !== null)
            dispatch({
                "type": "logout",
                "payload": null
            })
    }

    return {
        user,
        handleLogout
    }
}
export default useNav;