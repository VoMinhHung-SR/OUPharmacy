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
        .trim()
});

const useExamination = () => {
    const [user] = useContext(userContext);
    const [formEmail, setFormEmail] = useState('');
    const [patientID, setPatientID] = useState(-1);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [isFormEmailOpen, setIsFormEmailOpen] = useState(true)
    const [checkPatientExist, setCheckPatientExist] = useState(false);

    // Called when form have errors
    const handleOpenFormEmail = () =>{
        console.log(isFormEmailOpen)
        setIsFormEmailOpen(true)
    }
    
    const checkEmail = async (email) => {
        setFormEmail(email)
        setOpenBackdrop(true);
        const res = await fetchPatientExist(email);
        // handle when user onSubmit > 2 times
        if(res.status === 200){
            setCheckPatientExist(true);
            setPatientID(res.data.id);
        }
        // handled in services
        if (res === -1){
            setPatientID(-1);
            setCheckPatientExist(false);
        }

        setOpenBackdrop(false);
        setIsFormEmailOpen(false);
    }

    return {
        user,
        patientID,
        isFormEmailOpen,
        setIsFormEmailOpen,
        handleOpenFormEmail,
        checkEmail,
        openBackdrop,
        checkPatientExist,
        formEmail,
        setCheckPatientExist
    }
}

export default useExamination