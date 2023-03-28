import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import SuccessfulAlert, { ErrorAlert } from '../../../../config/sweetAlert2';
import { ROLE_USER } from '../../../../lib/constants';
import { fetchCreateLocation, fetchCreateUser, fetchDistrictsByCity, fetchUserRoles } from '../services';


const useRegister = () => {
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [isLoadingUserRole, setIsLoadingUserRole] = useState(true);
    const [dob, setDOB] = useState()
    const [gender, setGender] = useState(0)
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [userRoleID, setUserRoleID] = useState('');

    
    const [cityId, setCityId] = useState(null)
    const [districts, setDistricts] = useState([])
    const { allConfig } = useSelector((state) => state.config);
    useEffect(()=> {
        const loadUserRoles = async () => {
            const res = await fetchUserRoles();
            if(res.status === 200){
                if(res.data){
                    const userRole = res.data.filter(role => role.name === ROLE_USER)
                    if(userRole.length !== 0){
                        setUserRoleID(userRole[0].id)
                        setIsLoadingUserRole(false);
                    }
                    else{
                        setUserRoleID(-1);
                        setIsLoadingUserRole(false)
                    }
                }
                else{
                    setIsLoadingUserRole(false)
                }
            }else {
                setIsLoadingUserRole(false)
            }
        }

        const loadDistricts = async (cityId) => {
            const res = await fetchDistrictsByCity(cityId)
            if(res.status === 200){
                console.log(res.data)
                setDistricts(res.data)
            }
            else{
                setDistricts([])
            }
        }

        loadUserRoles()

        if(cityId)
            loadDistricts(cityId)
    },[cityId])

    const registerSchema = Yup.object().shape({
        firstName: Yup.string()
            .required("Họ không được để trống")
            .max(254, "Họ vượt quá độ dài cho phép"),
        lastName: Yup.string()
            .required("Tên không được để trống")
            .max(254, "Tên vượt quá độ dài cho phép"),
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
        city: Yup.number("").required("Tỉnh/thành phố không được để trống"),
        district: Yup.number("").required("Quận/Huyện không được để trống"),
    });
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

    // if(roles.length !== 0){
    //     const a = roles.filter(role => role.name === 'XUZ')
    //     console.log(a)
    // }

    const onSubmit = (data, setError) => {
        let date 
        setOpenBackdrop(true)
        if (data.dob !== undefined)
            date = new Date(data.dob).toISOString()

            
  

        const register = async (locationId) => {
            try {
                let formData = new FormData()
                console.log(userRoleID)
                formData.append("first_name", data.firstName)
                formData.append("last_name", data.lastName)
                formData.append("password", data.password)
                formData.append("email", data.email)
                formData.append("address", data.address)
                formData.append("phone_number", data.phoneNumber)
                formData.append("date_of_birth", date)
                formData.append("gender", gender)
                formData.append("avatar", selectedImage)
                formData.append("role", userRoleID)
                formData.append("location", locationId)
                const res = await fetchCreateUser(formData);

                if (res.status === 201) {
                    setOpenBackdrop(false)
                    SuccessfulAlert("Đăng ký thành công", "Ok", () => alert("DK THANH CONG"))
                }
            } catch (err) {
                if (err) {
                    let data = err.response;
                    setOpenBackdrop(false)
                    if (data.email)
                    setError("email", {
                        type: "custom",
                        message: data.email.join(", "),
                    });
                    if (data.phone_number)
                    setError("phoneNumber", {
                        type: "custom",
                        message: "Số điện thoại đã tồn tại"
                    });

                }
            }
        };
        const addLocation = async () => {
            // TODO: fetch location add lat && lng real
            const locationData = {
                lat:10.793500150986223,
                lng:106.67777364026149,
                city: data.city,
                district: data.district,
                address: '105 Trần Huy Liệu, Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam',
            }
            const res = await fetchCreateLocation(locationData)
            if(res.status===201)
                register(res.data.id);
            else{
                setOpenBackdrop(false)
                ErrorAlert('St error','double check please','OKE')
            }
        }
        addLocation()
    }
    return{
        userRoleID,isLoadingUserRole,
        dob,
        gender,
        openBackdrop,
        selectedImage,
        imageUrl,
        districts,
        onSubmit,
        setCityId,
        setDOB,
        setGender,
        setImageUrl,
        setSelectedImage,
        setOpenBackdrop,
        registerSchema
    }
}

export default useRegister

