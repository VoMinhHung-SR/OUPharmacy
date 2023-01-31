import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { fetchAccessToken } from '../services';
import { authApi, endpoints } from '../../../../config/APIs';
import { useNavigate } from 'react-router';
import cookies from "react-cookies"
import { userContext } from '../../../../App';
export const loginSchema = Yup.object().shape({
    username: Yup.string()
    .required("Tên người dùng không được để trống")
    .max(150, "Tên người dùng vượt quá độ dài cho phép"),
    password: Yup.string()
    .required("Mật khẩu không được phép để trống")
    .max(128, "Mật khẩu vượt quá độ dài cho phép"),
});

const useLogin = () => {
    const [user, dispatch] = useContext(userContext);
    const [openError, setOpenError] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [openBackdrop, setOpenBackdop] = useState(false);
    const nav = useNavigate();
    
    const mutation = useMutation((data) =>
        fetchAccessToken(data.username, data.password),
    );

    const onSubmit = async (data) => {
        console.log(data);
        setOpenBackdop(true)
        // fetch access token 
        // require 2 params username and password
        const res = await mutation.mutateAsync((data), {
             onSuccess: (data) => {
               // info current user
               getInfoCurrentUser();

            },onError:(err) =>{
                setOpenError(true);
                console.log(err)
            }
        });
        setOpenBackdop(false)
    };
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
    return {
        openBackdrop,
        openError,
        onSubmit,
        setOpenError
    }
}
export default useLogin;