import { useState } from "react";
import { fetchPatientExist } from "../services";
import * as Yup from 'yup';
import { REGEX_EMAIL } from "../../../../lib/constants";
import { useTranslation } from "react-i18next";

const useExamination = () => {
    const {t} = useTranslation('yup-validate')

    const [formEmail, setFormEmail] = useState('');
    const [patientID, setPatientID] = useState(-1);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [isFormEmailOpen, setIsFormEmailOpen] = useState(true)
    const [checkPatientExist, setCheckPatientExist] = useState(false);

    // Called when form dont have errors
    const handleOpenFormEmail = () =>{
        setIsFormEmailOpen(true)
    }
    const checkPatientExistSchema = Yup.object().shape({
        email: Yup.string()
            .required(t('yupEmailRequired'))
            .max(254, t('yupEmailMaxLenght'))
            .matches(REGEX_EMAIL, t('yupEmailInvalid'))
            .trim()
    });

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
        patientID,
        isFormEmailOpen,
        setIsFormEmailOpen,
        handleOpenFormEmail,
        checkEmail,
        openBackdrop,
        checkPatientExist,
        formEmail,
        setCheckPatientExist,
        checkPatientExistSchema
    }
}

export default useExamination