import APIs, { endpoints } from "../../../../config/APIs"

export const fetchAccessToken = async (username, password) =>{
    const response = await APIs.get(endpoints["auth-info"])
    if(response.status === 200){
        try {

            const res = await authApi().post(endpoints['login'], {
                'username': username,
                'password': password,
                'client_id': `${res.data.client_id}`,
                'client_secret': `${res.data.client_secret}`,
                'grant_type': 'password'
            })
            if (res.status === 200) {
                // luu trong cookies
                // setOpenBackdop(false)
                console.info(res2.data)
                cookies.save('token', res2.data.access_token)
                // info current user
                getInfoCurrentUser();
            }


        } catch (err) {
            if (err.response.status === 400) {
                console.log("st went wrong")
            }
        }
    }
    const getInfoCurrentUser = async () => {
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
}