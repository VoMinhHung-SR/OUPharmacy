import { useState } from 'react';
import * as Yup from 'yup';
const useRegister = () => {
    const [openBackdrop, setOpenBackdop] = useState(false);
    const [dob, setDOB] = useState()
    const currentDate = new Date()
    const [gender, setGender] = useState(0)
    const [signUpError, setSignUpError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const onSubmit = () => {
        console.log('submit')
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
        setOpenBackdop
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