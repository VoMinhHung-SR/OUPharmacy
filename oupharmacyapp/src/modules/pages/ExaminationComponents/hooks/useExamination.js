import { useContext, useState } from "react";
import { userContext } from "../../../../App";
import { fetchPatientExist } from "../services";
import * as Yup from 'yup';
import { REGEX_EMAIL } from "../../../../lib/constants";

export const checkPatientExistSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email không được để trống")
        .max(254, "Email vượt quá độ dài cho phép")
        .matches(REGEX_EMAIL, "email khong hop le")
});

const useExamination = () => {
    const [user] = useContext(userContext);
    
    const [checkPatientExist, setCheckPatientExist] = useState(false) ;

    const checkEmail = async (email) => {
        const res = await fetchPatientExist(email);
        console.log(res)
        // handle when user onSubmit > 2 times
        if(res.status === 200){
            setCheckPatientExist(true);
        }else{
            setCheckPatientExist(false);
        }
    }

    return {
        user,
        checkEmail,
        checkPatientExist,
        setCheckPatientExist
    }
}

export default useExamination