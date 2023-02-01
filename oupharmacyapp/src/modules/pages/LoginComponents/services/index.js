import APIs, { authApi, endpoints } from "../../../../config/APIs"
import cookies from "react-cookies"
import { useNavigate } from "react-router"
export const fetchAccessToken = async (username, password) =>{
    const getInfoCurrentUser = async () => {
        const nav = useNavigate()
        const user = await authApi().get(endpoints['current-user'])
        cookies.save('user', user.data)
    
        console.info(user.data)
        dispatch({
            'type': 'login',
            'payload': user.data
        })
        if (user != null) {
            nav("/")
        }
    }
    const response = await APIs.get(endpoints["auth-info"])
    if(response.status === 200){
        const res = await authApi().post(endpoints['login'], {
            'username': username,
            'password': password,
            'client_id': `${response.data.client_id}`,
            'client_secret': `${response.data.client_secret}`,
            'grant_type': 'password'
        })
        if (res.status === 200) {
            // luu trong cookies
            // setOpenBackdop(false)
            console.info(res.data)
            cookies.save('token', res.data.access_token)
            // info current user
            getInfoCurrentUser();
        }
    }
}