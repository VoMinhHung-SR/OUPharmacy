import { useState } from 'react';
import * as Yup from 'yup';
import SuccessfulAlert, { ErrorAlert } from '../../../../../config/sweetAlert2';
import { featchCreateExamination, fetchCreateOrUpdatePatient } from '../services';

export const formAddExaminationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("Họ bện nhân không được để trống")
        .max(254, "Họ bện nhân vượt quá độ dài cho phép"),
    lastName: Yup.string()
        .required("Tên bệnh nhân không được để trống")
        .max(254, "Tên bệnh nhân vượt quá độ dài cho phép"),
    email: Yup.string()
        .required("Email không được để trống")
        .max(254, "Email vượt quá độ dài cho phép")
        .email("Phải là một email hợp lệ"),
    phoneNumber: Yup.string()
        .required("SĐT không được để trống"),
    address: Yup.string()
        .required("Địa chỉ không được để trống"),
    dateOfBirth: Yup.string()
    .required("Địa chỉ không được để trống"),
    gender: Yup.string()
    .required("Địa chỉ không được để trống"),

    description: Yup.string()
        .required("Mô tả không được phép để trống"),
    createdDate: Yup.string()
        .required("Ngày tạo không được phép để trống"),

});


const useFormAddExamination = () => {
    const [openBackdrop, setOpenBackdrop] = useState(false)
    const onSubmit = async (patientID, data) => {
        if(data === undefined)
            return ErrorAlert("CO LOI XAY RA", "VUI LONG THU LAI SAU","Oke");

        const patientData = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone_number: data.phoneNumber,
            date_of_birth: data.dateOfBirth,
            address: data.address,
            gender: data.gender
        }

        setOpenBackdrop(true)
        console.log("patientID:" + patientID)
        const res = await fetchCreateOrUpdatePatient(patientID, patientData);
        // Update done or created patient info
        if(res.status === 200 || res.status === 201){
            console.log(res)
            const examinationData = {
                patient: res.data.id,
                description: data.description,
                created_date: data.createdDate
            }
            const resExamination = await featchCreateExamination(examinationData);
            if(resExamination.status === 201)
                SuccessfulAlert("Tạo thành công","OK")
            else{
                ErrorAlert("CO LOI XAY RA", "VUI LONG THU LAI SAU","Oke")
            }
            // setOpenBackdrop(false)
        }
        else{
            ErrorAlert("CO LOI XAY RA", "VUI LONG THU LAI SAU","Oke")
        }
        setOpenBackdrop(false)
    }
    return {
        openBackdrop,
        onSubmit
    }
}
export default useFormAddExamination
