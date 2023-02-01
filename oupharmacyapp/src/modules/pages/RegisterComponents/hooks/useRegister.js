import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { authMediaApi, endpoints } from '../../../../config/APIs';

const useRegister = () => {
    const nav = useNavigate();
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [dob, setDOB] = useState()
    const currentDate = new Date()
    const [gender, setGender] = useState(0)
    const [signUpError, setSignUpError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);


    // Sample data    
    // data{
    //   first_name: data.firstName,
    //   last_name: data.lastName,
    //   username: data.username,
    //   password: data.password,
    //   email: data.email,
    //   phone_number: data.phoneNumber,
    //   gender: data.gender,
    //   date_of_birth: date,
    //   address: data.address,
    //   avatar: selectedImage,
    // };
    const onSubmit = (data) => {
        let date 
        setOpenBackdrop(true)
        if (dob !== undefined)
            date = new Date(dob).toISOString()
        else
            date = new Date(currentDate).toISOString() 
     
        let formData = new FormData()

        formData.append("first_name", data.firstName)
        formData.append("last_name", data.lastName)
        formData.append("username", data.username)
        formData.append("password", data.password)
        formData.append("email", data.email)
        formData.append("address", data.address)
        formData.append("phone_number", data.phoneNumber)
        formData.append("date_of_birth", date)
        formData.append("gender", gender)
        formData.append("avatar", selectedImage)

        const register = async () => {
            try {
                const res = await authMediaApi().post(endpoints["register"], formData);

                if (res.status === 201) {
                    setOpenBackdrop(false)
                    SuccessfulAlert("Đăng ký thành công", "Ok", () => alert("DK THANH CONG"))
                }
            } catch (err) {
                if (err) {
                    console.log(err)
                    // let data = err.response.data;
                    // setOpenBackdrop(false)
                    // if (data.username)
                    //     setError("username", {
                    //         type: "custom",
                    //         message: data.username.join(", "),
                    //     });
                    // if (data.email)
                    //     setError("email", {
                    //         type: "custom",
                    //         message: data.email.join(", "),
                    //     });

                }
            }
        };

        register();
    }
    return{
        currentDate,
        dob,
        gender,
        openBackdrop,
        selectedImage,
        imageUrl,
        onSubmit,
        setDOB,
        setGender,
        setImageUrl,
        setSelectedImage,
        setOpenBackdrop
    }
}
export default useRegister

export const registerSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("Họ không được để trống")
        .max(254, "Họ vượt quá độ dài cho phép"),
    lastName: Yup.string()
        .required("Tên không được để trống")
        .max(254, "Tên vượt quá độ dài cho phép"),
    username: Yup.string()
        .required("Tên người dùng không được để trống")
        .max(150, "Tên người dùng vượt quá độ dài cho phép"),
    email: Yup.string()
        .required("Email không được để trống")
        .max(254, "Email vượt quá độ dài cho phép")
        .email("Phải là một email hợp lệ"),
    password: Yup.string()
        .required("Mật khẩu không được phép để trống")
        .max(128, "Mật khẩu vượt quá độ dài cho phép"),
    confirmPassword: Yup.string()
        .required("Mật khẩu xác nhận không được để trống")
        .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không đúng"),
    phoneNumber: Yup.string()
        .required("SĐT không được để trống"),
    address: Yup.string()
        .required("Địa chỉ không được để trống"),
});