import { useState } from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { fetchAccessToken } from '../services';
import cookies from "react-cookies"
import { authApi, endpoints } from '../../../../config/APIs';
import { useNavigate } from 'react-router';
export const loginSchema = Yup.object().shape({
    username: Yup.string()
    .required("Tên người dùng không được để trống")
    .max(150, "Tên người dùng vượt quá độ dài cho phép"),
    password: Yup.string()
    .required("Mật khẩu không được phép để trống")
    .max(128, "Mật khẩu vượt quá độ dài cho phép"),
});

const useLogin = () => {

    const [openError, setOpenError] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [openBackdrop, setOpenBackdop] = useState(false);
    const nav = useNavigate();

    const mutation = useMutation((data) =>
        fetchAccessToken(data.username, data.password),
    );

    const onSubmit = async (data) => {
        console.log(data);
        await mutation.mutateAsync(data, {
             onSuccess: (data) => {
               // handle error here
               // TODO: setCookies here
               setOpenBackdop(false)
               console.info(data)
               cookies.save('token', res2.data.access_token)
               // info current user
               getInfoCurrentUser();

            },onError:(err) =>{
                setOpenError(true);
                console.log(err)
            }
        });
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
        onSubmit,
        openError,
        setOpenError
    }
}
export default useLogin;