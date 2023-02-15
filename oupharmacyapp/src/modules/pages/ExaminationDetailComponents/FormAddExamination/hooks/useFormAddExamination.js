import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import SuccessfulAlert, { ErrorAlert } from '../../../../../config/sweetAlert2';
import { REGEX_ADDRESS, REGEX_EMAIL, REGEX_NAME, REGEX_NOTE, REGEX_PHONE_NUMBER } from '../../../../../lib/constants';
import { featchCreateExamination, fetchCreateOrUpdatePatient } from '../services';


const useFormAddExamination = () => {
    const {t} = useTranslation(['yup-validate','modal']);

    const [openBackdrop, setOpenBackdrop] = useState(false)

    const formAddExaminationSchema = Yup.object().shape({
        firstName: Yup.string().trim()
            .required(t('yupFirstNameRequired'))
            .max(150, t('yupFirstNameMaxLenght'))
            .matches(REGEX_NAME, t('yupFirstNameInvalid')),

        lastName: Yup.string().trim()
            .required(t('yupLastNameRequired'))
            .max(150, t('yupLastNameMaxLenght'))
            .matches(REGEX_NAME, t('yupFirstNameInvalid')),

        email: Yup.string().trim()
            .required(t('yupEmailRequired'))
            .max(254, t('yupEmailMaxLenght'))
            .matches(REGEX_EMAIL, t('yupEmailInvalid')),

        phoneNumber: Yup.string().trim()
            .required(t('yupPhoneNumberRequired'))
            .matches(REGEX_PHONE_NUMBER, t('yupPhoneNumberInvalid')),
            
        address: Yup.string().trim()
            .required(t('yupAddressRequired'))
            .matches(REGEX_ADDRESS, t('yupAddressInvalid')),

        dateOfBirth: Yup.string()
            .required(t('yupDOBRequired'))
            .max(254, t('yupLastNameMaxLenght')),

        gender: Yup.string()
        .required(t('yupGenderRequired')),
    
        description: Yup.string().trim()
            .required(t('yupDescriptionRequired'))
            .max(254, t('yupDescriptionMaxLenght'))
            .matches(REGEX_NOTE, t('yupDescriptionInvalid')),
        createdDate: Yup.string()
            .required(t('yupCreatedDateRequired')),
    
    });

    const onSubmit = async (patientID, data) => {
        if(data === undefined)
            return ErrorAlert(t('modal:errSomethingWentWrong'), t('modal:pleaseTryAgain'), t('modal:ok'));

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
                SuccessfulAlert(t('modal:createSuccessed'),t('modal:ok'))
            else{
                ErrorAlert(t('modal:errSomethingWentWrong'), t('modal:pleaseTryAgain'), t('modal:ok'));
            }
            // setOpenBackdrop(false)
        }
        else{
            setOpenBackdrop(false)
            ErrorAlert(t('modal:errSomethingWentWrong'), t('modal:pleaseTryAgain'), t('modal:ok'));
        }
        setOpenBackdrop(false)
    }
    return {
        openBackdrop,
        onSubmit,
        formAddExaminationSchema
    }
}
export default useFormAddExamination;