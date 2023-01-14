import { useState } from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { fetchAccessToken } from '../services';

export const loginSchema = Yup.object().shape({
    username: Yup.string()
    .required("Tên người dùng không được để trống")
    .max(150, "Tên người dùng vượt quá độ dài cho phép"),
    password: Yup.string()
    .required("Mật khẩu không được phép để trống")
    .max(128, "Mật khẩu vượt quá độ dài cho phép"),
});

const useLogin = () => {

    const [isLoginError, setIsLoginError] = useState(false);
    const [signUpError, setSignUpError] = useState('');

    const mutation = useMutation((username, password) =>
        fetchAccessToken(username, password),
    );
    // const router = useRo();
    const onSubmit = async (data) => {
        await mutation.mutateAsync({
            username: data.username,
            password: data.password,
        }, {
             onSuccess: (data) => {
               // handle error here
              if (data.errMgs) {  setIsLoginError(true); return; }

              // TODO: setCookies here
              sessionStorage.setItem('current-user', data.access_token);
              handleGetCurrentCustomer({ token: data.access_token });
              router.push('/');
            },
        });
    };
    return {
        onSubmit
    }
}
export default useLogin;